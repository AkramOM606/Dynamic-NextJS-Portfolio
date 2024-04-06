import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import Shapes from "./Shapes";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <div
      id={slice.primary.heading == "Experience" ? "experience" : "education"}
    >
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Heading as="h2" size="lg">
          {slice.primary.heading}
        </Heading>
        {slice.items.map((item, index) => (
          <div key={index} className="ml-6 mt-8 md:ml-12 md:mt-16">
            <Heading as="h3" size="sm">
              {item.title}
            </Heading>

            <div className="mt-1 max-h-[250px] flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
              <span>{item.time_period}</span>{" "}
              <span className="text-3xl font-extralight">/</span>{" "}
              <span>{item.institution}</span>
            </div>
            <div className="block lg:flex">
              <div className="prose prose-lg prose-invert mt-4">
                <PrismicRichText field={item.description} />
              </div>
              <div className="relative grow mt-10 md:mt-2 h-[200px]">
                <Shapes />
              </div>
            </div>
          </div>
        ))}
      </Bounded>
    </div>
  );
};

export default Experience;
