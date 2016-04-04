import {Pipe, PipeTransform} from 'angular2/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({name: 'loginTransformation'})
export class LoginPipe implements PipeTransform {
    transform(value:string, [exponent]) :string{
        let array=[];
        array=value.split(" ");
        let finalString="";
        //finalString= value.toLowerCase();
        for( var i=0;i<array.length;i++){
            array[i]=array[i].toLowerCase();
            if(i==0){
                finalString=array[i].toLowerCase();
            }
            else{
                finalString=finalString+"."+array[i].toLowerCase();
            }
        }
        return finalString;
    }
}