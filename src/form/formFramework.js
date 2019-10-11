export function createControl(config, validation){
	return {
		...config,
		validation,
		touched: false,
		valid: !validation,
		value: ""
	}
}

export function validateControl(value, validation){
	if(!validation)
		return true;

	let isValid = true;

	if(validation.required)
		isValid = value.trim() !== "" && isValid;

	return isValid;
}

export function validateForm(formControls){
	let isFormValid = true;

	for(let controlName in formControls)
		if(formControls.hasOwnProperty(controlName))
			isFormValid = formControls[controlName].valid && isFormValid;

	return isFormValid;	
}