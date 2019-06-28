import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../model/user.model';

@Pipe({
    name: 'userPipe'
    // ,pure:false
  })
export class UserPipe implements PipeTransform {
    transform(users: UserModel[], searchString:String): any [] {    
        console.log('val',searchString);
        if (!searchString) {
          return users;
        }
       
}
}