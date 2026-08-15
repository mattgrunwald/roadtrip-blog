import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

export default [
  ...nextCoreWebVitals,
  prettier,
  {
    // contentlayer2's useMDXComponent() returns a component derived from
    // post content; rendering it as <MDXContent /> in the same function is
    // the documented pattern, not the render-time-component-creation bug
    // this rule targets.
    files: [
      "app/page.tsx",
      "app/epilogue/page.tsx",
      "app/day/\\[day\\]/page.tsx",
      "app/about/\\[name\\]/page.tsx",
    ],
    rules: {
      "react-hooks/static-components": "off",
    },
  },
];
