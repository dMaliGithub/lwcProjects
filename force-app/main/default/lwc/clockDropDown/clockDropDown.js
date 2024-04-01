import { LightningElement,api } from 'lwc';

export default class ClockDropDown extends LightningElement {
    @api label='';
    @api options=[];
    @api uniqueId='';

    changeHandler(event){
        // console.log(this.label)
        // console.log(event.target.value)
        this.callParent(event.target.value);
    }

    callParent(value){
        this.dispatchEvent(new CustomEvent('optionhandler',{
            detail:{
                label:this.label,
                value:value
            }
        }));
        
    }

    // this method will be called from parent and "" will be passed as value from their
    @api reset(value){
        // finding the reference
        this.template.querySelector('select').value=value;
        // after setting values acknowledging parent using child to parent comm. 
        // dispatch event
        this.callParent(value);
    }
}