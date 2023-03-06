namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ActiviityId { get; set; }
        public Activity Activiity { get; set; }
        public bool IsHost { get; set; }
    }
}