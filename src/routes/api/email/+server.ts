import { Resend } from "resend"
import { RESEND_KEY } from '$env/static/private';
import { emailRecipient } from "../../../../.data/site";
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST({ request }) {

    if (!emailRecipient) {
        return new Response(JSON.stringify(
            "Recipient not specified"
        ), { status: 422 });
    }

    if (!regex.test(emailRecipient)) {
        return new Response(JSON.stringify(
            "Recipient is not a valid email address"
        ), { status: 422 });
    }

    if (!RESEND_KEY || RESEND_KEY == '') {
        return new Response(JSON.stringify(
            "API key not specified."
        ), { status: 422 });
    }

    const requestBody = await request.json();
    const { name, email, subject, message } = requestBody;
    let errors = [];

    if (name.length < 1) errors.push({name:true})
    if (!regex.test(email)) errors.push({email:true})
    if (subject.length < 1) errors.push({subject:true})
    if (message.length < 1) errors.push({message:true})

    if (errors.length == 0) {
        const resend = new Resend(RESEND_KEY);
        try {
            const response = await resend.emails.send({
                from: `${name} <onboarding@resend.dev>`, //you can use resend's domaing or setup your own domain on resend.com
                to: emailRecipient,
                subject: subject, 
                text: message, 
                reply_to: email 
            });
            if (response.data?.id) {
                return new Response(JSON.stringify({success: true}), { status: 200 });
            }
            errors.push({resend:response})
        } catch (error) {
            errors.push({resend:error})
        }
    }
    
    return new Response(JSON.stringify(errors), { status: 422 });
}