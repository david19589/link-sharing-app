import { SVGProps, Ref, forwardRef } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="#FFF"
      d="m11 8.801-2.334 1.555v2.398L12.798 10 11 8.8ZM9.798 8 8 6.8 6.202 8 8 9.198 9.798 8Zm3.535-.755L12.202 8l1.131.754V7.245ZM12.798 6 8.666 3.246v2.397L11 7.198 12.798 6ZM5 7.198l2.333-1.555V3.246L3.202 6 5 7.198ZM3.202 10l4.131 2.754v-2.398L5 8.801 3.202 10Zm-.536-1.246L3.798 8l-1.132-.755v1.51ZM1.333 6a.667.667 0 0 1 .297-.555l6-4a.667.667 0 0 1 .74 0l6 4a.666.666 0 0 1 .296.555v4a.665.665 0 0 1-.296.554l-6 4a.667.667 0 0 1-.74 0l-6-4A.666.666 0 0 1 1.333 10V6Z"
    />
  </svg>
);
const CodePen = forwardRef(SvgComponent);
export default CodePen;