using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ID { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.ID);

                if (activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attentance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attentance != null && hostUsername == user.UserName)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }

                if (attentance != null && hostUsername != user.UserName)
                {
                    activity.Attendees.Remove(attentance);
                }

                if (attentance == null)
                {
                    attentance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activiity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attentance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attentance");
            }
        }
    }
}