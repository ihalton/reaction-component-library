import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import mockComponents from "../../../tests/mockComponents";
import realComponents from "../../../tests/realComponents";
import PaypalSmartButton from "./PaypalSmartButton";

test("basic snapshot", () => {
    const component = renderer.create(<PaypalSmartButton components={mockComponents} />);
  
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });