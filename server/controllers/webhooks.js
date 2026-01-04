
import { Webhook } from "svix";
import User from"../models/User.js"

//API controller functionto manage clerk user with database

export const clerkwebhooks = async (req,res) => {
    try {
        // create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        if(!whook) {
            return res.status(400).json({success:false,message:"Webhook not found"})
        } 

        //verifying Headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        }) 




        //Getting data from request body
        const {data,type} =req.body

        //switch cases for different events
        switch (type) {
            case 'user.created':{
                const userData ={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                    resume:''
                } 
                console.log(userData);
                
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData ={     
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,             
                } 
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }

            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                console.log("Broke");
                break;
        

        }
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:'webhooks Error!'})
    }
}  
    

// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const clerkwebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const payload = req.body.toString("utf8"); // raw body
//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     const event = whook.verify(payload, headers);
//     const { data, type } = JSON.parse(payload);

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id, // Clerk user id
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//           resume: "",
//         };
//         await User.create(userData);
//         break;
//       }
//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       }
//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         break;
//       }
//       default:
//         console.log("Unhandled event: ", type);
//     }

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Webhook error:", error.message);
//     res.status(400).json({ success: false, message: "Webhook Error!" });
//   }
// };
