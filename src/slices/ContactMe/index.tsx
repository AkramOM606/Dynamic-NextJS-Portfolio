"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { asText } from "@prismicio/client";
import EarthCanvas from "./Earth";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { and } from "three/examples/jsm/nodes/Nodes.js";

/**
 * Props for `ContactMe`.
 */
export type ContactMeProps = SliceComponentProps<Content.ContactMeSlice>;

/**
 * Component for "ContactMe" Slices.
 */

const ContactMe = ({ slice }: ContactMeProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: any }) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (form.name == "" || form.email == "" || form.message == "") {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    emailjs
      .send(
        "service_miklwgl",
        "template_t9ybp9o",
        {
          from_name: form.name,
          to_name: "Akram TEST",
          from_email: form.email,
          to_email: "v.sunior@gmail.com",
          message: form.message,
        },
        "Bkak_yyg3_o7dw3Hi"
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thank you! We will get in touch soon.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div id="contact" className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
          <div className="p-8 rounded-2xl bg-slate-800">
            <div>
              <Heading size="sm">{slice.primary.sub_heading}</Heading>
            </div>
            <div>
              <Heading size="lg">{slice.primary.heading}</Heading>
            </div>

            <form
              className="mt-12 flex flex-col gap-8"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What is your name?"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your Email</span>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What is your email?"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  {slice.primary.contact_field}
                </span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={asText(slice.primary.contact_field_entry)}
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
                />
              </label>
              <button
                type="submit"
                className="bg-slate-700 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              >
                {loading ? "Sending..." : "Send"}
              </button>
              <ToastContainer />
            </form>
          </div>

          <div className="xl:flex-1 xl:h-auto md:h-[450px] h-[350px]">
            <EarthCanvas />
          </div>
        </div>
      </Bounded>
    </div>
  );
};

export default ContactMe;
