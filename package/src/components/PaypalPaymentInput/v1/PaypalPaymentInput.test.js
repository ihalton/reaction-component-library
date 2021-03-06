import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import mockComponents from "../../../tests/mockComponents";
import realComponents from "../../../tests/realComponents";
import PaypalPaymentInput from "./PaypalPaymentInput";



test("basic snapshot", () => {
    const component = renderer.create(<PaypalPaymentInput components={mockComponents} />);
  
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
