"use client";

import { useWizard } from "../hooks/use-wizard";
import { Input, Select, Textarea } from "./form-elements";

export const Step1Product = () => {
  const { state, dispatch } = useWizard();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900">
          Product Identity
        </h2>
        <p className="font-serif text-sm text-grey-500 mt-1">
          Define who this is for and how it should feel.
        </p>
      </div>

      <Input
        label="Brand / Product Name"
        value={state.brandName}
        onChange={(v) => {
          return dispatch({ type: "SET_FIELD", field: "brandName", value: v });
        }}
        required
        placeholder="MyApp"
      />
      <Input
        label="Tagline"
        value={state.tagline}
        onChange={(v) => {
          return dispatch({ type: "SET_FIELD", field: "tagline", value: v });
        }}
        placeholder="Build something extraordinary"
      />
      <Textarea
        label="Product Description"
        value={state.productDescription}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "productDescription",
            value: v,
          });
        }}
        placeholder="What does your product do?"
        rows={3}
      />
      <Textarea
        label="Target Users & Purpose"
        value={state.targetUsers}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "targetUsers",
            value: v,
          });
        }}
        placeholder="Who is this for? What job are they trying to get done?"
        rows={3}
      />
      <Textarea
        label="Brand Personality (3-5 keywords)"
        value={state.brandPersonality}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "brandPersonality",
            value: v,
          });
        }}
        placeholder="Clean · High-end · Stylish"
        rows={2}
      />
      <Textarea
        label="Anti-References"
        value={state.antiReferences}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "antiReferences",
            value: v,
          });
        }}
        placeholder="What should your design NOT look like?"
        rows={3}
      />
      <Select
        label="Accessibility Target Level"
        value={state.accessibilityLevel}
        onChange={(v) => {
          return dispatch({
            type: "SET_FIELD",
            field: "accessibilityLevel",
            value: v,
          });
        }}
        options={[
          { value: "AA", label: "WCAG 2.1 AA" },
          { value: "AAA", label: "WCAG 2.1 AAA" },
        ]}
      />
    </div>
  );
};
