import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonList, IonItemDivider, IonItem } from '@ionic/react';
import StripeCheckout from 'react-stripe-checkout';
import './Tab1.css';

type State = {
  quantity: string,
  style: string
}

class Tab1 extends React.Component<{},State>{

  constructor(props: any) {
    super(props);

    this.state = {
      quantity: '3',
      style: 'StyleOne'
    }
  }

  QuantityChanged = (propertyName: string, newValue: any) => {
    console.log('Property Update')
    console.log(`Upadting ${propertyName} to  ${newValue}`)
    if(propertyName === 'quantity')
    {
      this.setState({quantity: newValue})
    }
    else if (propertyName === 'style')
    {
      this.setState({style: newValue})
    }
  }

  handleSubmit = (token: any) =>{
    console.log('Attempting To Charge Card')
    console.log(token)
    let test = this.stripeTokenHandler(token);
    console.log(test)

    // Need to find away to validate payment has gone through
  }

  async stripeTokenHandler(token: any) {
    const paymentData = {
      stripeToken: token.id,
      quantity: this.state.quantity,
      style: this.state.style
    };
    console.log('Sending Post')
    const response = await fetch('https://us-central1-teststripe-898de.cloudfunctions.net/stripeTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData),
    });
    console.log('Response Recieved')
    let returned = response.json()
    console.log(returned)
  }

  render(){
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Testing Stripe Basic Payment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        <IonItemDivider>Quantity</IonItemDivider>
        <IonItem>
          <IonInput value={this.state.quantity} onIonChange={(e) => this.QuantityChanged('quantity', e.detail.value)} ></IonInput>
        </IonItem>
        <IonItemDivider>Style</IonItemDivider>
        <IonItem>
          <IonInput value={this.state.style} onIonChange={(e) => this.QuantityChanged('style', e.detail.value)} ></IonInput>
        </IonItem>
        </IonList>
        <StripeCheckout
            stripeKey="pk_test_cFsAVCGnWPQW75xZfBrhg3mf00NWliuU2M"
            token={this.handleSubmit}
            />
      </IonContent>
    </IonPage>
  );
  }
};

export default Tab1;

// async function stripeTokenHandler(token: any) {
//   const paymentData = {
//     stripeToken: token.id,
//     quantity: this.state.quantity,
//   };
//   console.log('Sending Post')
//   const response = await fetch('https://us-central1-teststripe-898de.cloudfunctions.net/stripeTest', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(paymentData),
//   });
//   console.log('Response Recieved')
//   // Return and display the result of the charge.
//   return response.json();
// }
