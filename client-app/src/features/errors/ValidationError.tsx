import { Message } from "semantic-ui-react";

interface Props {
    errors: any; // cheating for now 
}

export default function ValidationError({ errors }: Props) {
    return (
        <Message error>
            {
                errors && (
                    <Message.List>
                        {errors.map((err: any, i: any) => (
                            <Message.Item key={i}>{err}</Message.Item>
                        ))}
                    </Message.List>
                )
            }
        </Message>
    )
}