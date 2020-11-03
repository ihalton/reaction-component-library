import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { PayPalButton } from "react-paypal-button-v2";

const PaypalButtonWrapper = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  position: relative;
  min-width: 800px;
`;

class PaypalSmartButton extends Component {
  static propTypes = {
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({}).isRequired,

    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currency: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    shippingPreference: PropTypes.string,
    onSuccess: PropTypes.func,
    catchError: PropTypes.func,
    onError: PropTypes.func,
    createOrder: PropTypes.func,
    createSubscription: PropTypes.func,
    onApprove: PropTypes.func,
    style: PropTypes.object,
    options: PropTypes.shape({
      clientId: PropTypes.string,
      merchantId: PropTypes.string,
      currency: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      intent: PropTypes.string,
      commit: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      vault: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      component: PropTypes.string,
      disableFunding: PropTypes.string,
      disableCard: PropTypes.string,
      integrationDate: PropTypes.string,
      locale: PropTypes.string,
      buyerCountry: PropTypes.string,
      debug: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    }),
    onButtonReady: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    options: {
      clientId: "sb",
      currency: "USD",
    },
    shippingPreference: "GET_FROM_FILE",
  };

  state = {};

  componentDidUpdate = () => {};

  render() {
    const {createOrder, onApprove, options} = this.props;
    return (
      <PaypalButtonWrapper>
        <PayPalButton options={options} createOrder={(data, actions) => createOrder(data, actions)} onApprove={(data, actions) => onApprove(data, actions)}></PayPalButton>
      </PaypalButtonWrapper>
    );
  }
}

export default withComponents(PaypalSmartButton);
