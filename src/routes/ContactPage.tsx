import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "../index.css";

const schema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(16, { message: "Name must be at most 16 characters long" }),
    email: z
        .string()
        .email({ message: "Please enter a valid email" })
        .refine((email) => email.endsWith("@gmail.com"), {
            message: "Only gmail.com emails allowed",
        }),
    message: z
        .string()
        .min(3, { message: "Message must be at least 3 characters long" }),
});

type ContactFormData = z.infer<typeof schema>;

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

    return (
        <>
            <div className="contactPage">
                <div className="contactPageStyle">
                    {/* forms to contact */}
                    <form
                        onSubmit={handleSubmit((data) => {
                            const subject = encodeURIComponent(
                                "New Contact from Portfolio"
                            );
                            const body = encodeURIComponent(
                                `Hi, This is ${data.name}, and this is my message form your portfoilo:\n${data.message}`
                            );
                            const mailtoLink = `mailto:dev.elliot.j@gmail.com?subject=${subject}&body=${body}`;
                            window.open(mailtoLink, "_blank");
                            reset();
                        })}
                        className="contactForm"
                    >
                        {/* New Email Message */}
                        <div className="ContactWay">
                            Get in touch and send me an Email:
                        </div>

                        {/* Name */}
                        <label htmlFor="name">
                            <div className="inputTitle">Name</div>
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className={
                                    errors.name ? "inputActive" : "input"
                                }
                                placeholder="Enter Your Name"
                            />
                            <div
                                className={
                                    errors.name ? "errValActive" : "errVal"
                                }
                            >
                                {errors.name && errors.name.message}
                            </div>
                        </label>

                        {/* Email */}
                        <label htmlFor="email">
                            <div className="inputTitle">Email</div>
                            <input
                                {...register("email")}
                                type="text"
                                id="email"
                                className={
                                    errors.email ? "inputActive" : "input"
                                }
                                placeholder="Enter Your Email"
                            />
                            <div
                                className={
                                    errors.email ? "errValActive" : "errVal"
                                }
                            >
                                {errors.email && errors.email.message}
                            </div>
                        </label>

                        {/* Message */}
                        <label htmlFor="msg">
                            <div className="inputTitle">Message</div>
                            <textarea
                                {...register("message")}
                                id="msg"
                                className={
                                    errors.message ? "inputActive" : "input"
                                }
                                placeholder="Enter Your Message"
                            />
                            <div
                                className={
                                    errors.message ? "errValActive" : "errVal"
                                }
                            >
                                {errors.message && errors.message.message}
                            </div>
                        </label>

                        {/* Submit Button */}
                        <button className="SubmitBtn">Submit</button>

                        <div className="line"></div>

                        {/* Another Way */}
                        <div className="ContactWay">
                            OR you can message me on Whatsapp:
                        </div>

                        {/* Whatsapp Button */}
                        <Link
                            to={"https://wa.me/qr/UG7XUCIS5KQRO1"}
                            target="_blank"
                            className="whatsappBtn"
                        >
                            <FaWhatsapp size={22} /> Whatsapp
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
