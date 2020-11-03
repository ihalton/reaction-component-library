import React, { Component } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { addTypographyStyles, CustomPropTypes } from "../../../utils";
const SecureCaption = styled.div`
  ${addTypographyStyles("StripePaymentInputCaption", "captionText")}
`;

const IconLockSpan = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
`;

const Span = styled.span`
  vertical-align: super;
`;

class PaypalPaymentInput extends Component {
  static propTypes = {
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Secured lock icon
       */
      iconLock: PropTypes.node,
      /**
       * Pass either the Reaction PaypalSmartButton component or your own component that
       * accepts compatible props.
       */
      PaypalSmartButton: CustomPropTypes.component.isRequired,
    }),
    /**
     * Pass true while the input data is in the process of being saved.
     * While true, the form fields are disabled.
     */
    isSaving: PropTypes.bool,
    /**
     * When this action's input data switches between being
     * ready for saving and not ready for saving, this will
     * be called with `true` (ready) or `false`
     */
    onReadyForSaveChange: PropTypes.func,
    /**
     * Called with an object value when this component's `submit`
     * method is called. The object may have `data`, `displayName`,
     * and `amount` properties.
     */
    onSubmit: PropTypes.func,
    /**
     * The text for the "Your Information is private and secure." caption text.
     */
    secureCaptionText: PropTypes.string,


    /**
     * totalAmount for paypal
     */
    amount: PropTypes.number.isRequired,

    /**
     * clientId for paypal
     */
    clientId: PropTypes.string.isRequired
  };

  state = { orderID: null, captureId: null };

  static defaultProps = {
    onReadyForSaveChange() {},
    onSubmit() {},
    secureCaptionText: "Your Information is private and secure.",
  };

  componentDidMount() {
    const { onReadyForSaveChange } = this.props;
    onReadyForSaveChange(false);
  }

  async submit() {
    const { onSubmit } = this.props;
    const { orderID } = this.state
    await onSubmit({
      displayName: `orderId - ${orderID} successfully.`,
      data: {
        paypalOrderId: orderID
      },
    });
  }

  handleChangeReadyState = (isReady) => {
    const { onReadyForSaveChange } = this.props;

    if (isReady !== this.lastIsReady) {
      onReadyForSaveChange(isReady);
    }
    this.lastIsReady = isReady;
  };

  handleOnApprove = async(data, actions) => {
    // console.log('onApprove:', data, 'actions:', actions);
    // Capture the funds from the transaction
    const captureId = await actions.order.capture().then(function (details) {
      // Show a success message to your buyer
      // alert("Transaction completed by " + details.payer.name.given_name);
      // console.log('details:', details);

      return details.purchase_units[0].payments.captures[0].id;
    });

    // const authorizationID = await actions.order.authorize().then(function(authorization){
    //   // Get the authorization id
    //   const authorizationID = authorization.purchase_units[0].payments.authorizations[0].id
    //   // alert('You have authorized this transaction. Order ID:  ' + data.orderID + ', Authorization ID: ' + authorizationID); // Optional message given to purchaser
      
    //   return authorizationID
    // })

    this.setState({
      orderID:data.orderID,
      captureId:captureId
    })
    this.handleChangeReadyState(true);

    return {
      orderID: data.orderID,
      captureId:captureId
    }
  }



  handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: this.props.amount,
          },
        },
      ],
      // application_context: {
      //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
      // }
    });
  }

  render() {
    const {
      className,
      components: { iconLock, PaypalSmartButton },
      secureCaptionText,
      clientId
    } = this.props;
    const options = {
      clientId: clientId,
      currency: "USD",
    };
    return (
      <div className={className}>
        <PaypalSmartButton
          createOrder={this.handleCreateOrder}
          onApprove={this.handleOnApprove}
          options={options}
        />
        <SecureCaption>
          <IconLockSpan>{iconLock}</IconLockSpan> <Span>{secureCaptionText}</Span>
        </SecureCaption>
      </div>
    );
  }
}

export default withComponents(PaypalPaymentInput);
