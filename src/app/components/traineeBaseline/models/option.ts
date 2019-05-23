export class Option {
  id: number;
  name: string;
  selected: boolean;

  constructor(data, ans) {
    data = data || {};
    console.log("In Option---" + JSON.stringify(data));
    if(data.value != null){
      this.id = data.option;
      this.name = data.value;
      console.log("dsfdsfsfdsfdsf",this.id)
    }
    
    if (data.option == ans) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }
}
