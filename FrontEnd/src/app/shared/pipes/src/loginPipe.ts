import {Pipe, PipeTransform} from '@angular/core';
/**
 * LoginPipe
 * The pipe is used to generate the login. We replace each space by a dot
 * and we put all the letter in lower case before returning the final login.
 */
@Pipe({name: 'loginTransformation'})
export class LoginPipe implements PipeTransform {
    transform(value:string, [exponent]) :string{
        let array=[];
        array=value.split(" ");
        let login="";
        for( var i=0;i<array.length;i++){
            array[i]=array[i].toLowerCase();
            if(array[i].length>0){
                if(i==0){
                    login=array[i].toLowerCase();
                }
                else{
                    login=login+"."+array[i].toLowerCase();
                }
            }
        }
        return login;
    }
}