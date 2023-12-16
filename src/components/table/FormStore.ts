import { useRef } from "react"

interface IFormProps {
  store: any
}


class FormStore {
  store=[];
  constructor(){
    this.store = []
  }

  // setField
}



export function useForm(){
  const formRef: any = useRef();

  if(!formRef.current){
    formRef.current = new FormStore()
  }

  return formRef.current;
}

