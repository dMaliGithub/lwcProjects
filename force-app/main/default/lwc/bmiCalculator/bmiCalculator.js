import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height="";
    weight="";
    bmiValue="";
    result="";
    inputHandler(event)
    {
        console.log(event.target.name);
        console.log(event.target.value);
        console.log("inside input handler");
        if(event.target.name === "height")
        {
            console.log("inside height if");
            this.height = event.target.value;
        }
        else if(event.target.name === "weight")
        {
            console.log("inside weight if");
            this.weight = event.target.value;
        }

        console.log("height from i/p handler:", this.height);
        console.log("weight from i/p handler", this.weight);
    }

    submitHandler(event)
    {
        event.preventDefault();
        console.log("height from submitHandler:", this.height);
        console.log("weight from submitHandler:", this.weight);
        this.calculate();
    }

    calculate(){
        //BMI = weight in KG / (height in m * height in m)
        let height = parseInt(this.height)/100;
        let bmi = parseInt(this.weight)/(height*height);
        console.log("calculated bmi: ",bmi);
        this.bmiValue = parseFloat(bmi.toFixed(2));

        if(this.bmiValue <18.5){
            this.result = "Underweight"
          } else if(this.bmiValue >=18.5 && this.bmiValue <25){
            this.result = "Healthy"
          } else if(this.bmiValue >=25 && this.bmiValue <30){
            this.result = "Overweight"
          } else {
            this.result = "Obese"
          }
      
          console.log("BMI Value is : ", this.bmiValue)
          console.log("Result is : ", this.result)
    }

    recalculate()
    {
        this.height="";
        this.weight="";
        this.bmiValue="";
        this.result="";
    }
}