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
        "SERVICE_ID",
        "TEMPLATE_ID",
        {
          from_name: form.name,
          to_name: "YOUR_NAME",
          from_email: form.email,
          to_email: "YOUR_EMAIL",
          message: form.message,
        },
        "PUBLIC_KEY",
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
        },
      );
  };

  return (
    <div id="contact" className="bg-black-100 flex-[0.75] rounded-2xl p-8">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
          <div className="max-lg self-center rounded-2xl bg-slate-800 p-8 lg:max-w-full">
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
                <span className="mb-4 font-medium text-white">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What is your name?"
                  className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-black outline-none"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-4 font-medium text-white">Your Email</span>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What is your email?"
                  className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-black outline-none"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-4 font-medium text-white">
                  {slice.primary.contact_field}
                </span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={asText(slice.primary.contact_field_entry)}
                  className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-black outline-none"
                />
              </label>
              <button
                type="submit"
                className="shadow-primary w-fit rounded-xl bg-slate-700 px-8 py-3 font-bold text-white shadow-md outline-none"
              >
                {loading ? "Sending..." : "Send"}
              </button>
              <ToastContainer />
            </form>
          </div>

          <div className="h-[350px] md:h-[450px] xl:h-auto xl:flex-1">
            <EarthCanvas />
          </div>
        </div>
      </Bounded>
    </div>
  );
};

export default ContactMe;
