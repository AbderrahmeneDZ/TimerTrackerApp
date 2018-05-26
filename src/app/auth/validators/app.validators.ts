import { ValidationErrors, AbstractControl } from "@angular/forms";

export class AppValdiators{
    
    static passwordsShouldMatch(control: AbstractControl) {
        
        if(control.parent == null)
            return null

        let password : String = control.parent.get('password').value
        let confirmPassword : String = control.parent.get('confirmPassword').value

        if (password !== confirmPassword)
            return { passwordShouldMatch: true}

        return null
    }

    static passwordFollowPattern(control: AbstractControl){
        let password:string = control.value
        let match = password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')

        if (!match)
            return { passwordShouldMatchPattern: true}
        
        return null
    }
}