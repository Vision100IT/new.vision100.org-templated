import React, { Component } from 'react';

class SupportDetailsPaypal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sid: this.props.sid,
      pledgeAmount: this.props.pledgeAmount
    }
  }

  render() {
    return (
      <>
        <p>You may also financially support Vision 100 via Paypal. If you wish to use Paypal to complete your pledge, please click the button below and you will be redirected to the Paypal site to finalise your pledge using your Paypal account or credit card.</p>
        <br />

        <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
          <input type="hidden" name="cmd" value="_cart" />
          <input type="hidden" name="business" value="treasurer@vision100.org" />
          <input type="hidden" name="currency_code" value="AUD" />
          <input type="hidden" name="upload" value="1" />
          <input type="hidden" name="no_shipping" value="1" />
          <input type="hidden" name="return" value={"http://vision100.org/PaypalReturn/pledge"} />
          <input type="hidden" name="amount_1" value={this.state.pledgeAmount} />
          <input type="hidden" name="quantity_1" value="1" />
          <input type="hidden" name="item_name_1" value={"V100 Pledge"} />
          <input type="Submit" name="submit" value="Complete Pledge with Paypal" />
        </form>
        <br />
      </>

    );
  }
}

export default SupportDetailsPaypal;