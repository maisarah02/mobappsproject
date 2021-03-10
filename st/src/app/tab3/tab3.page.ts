import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
post = {} as Post;

  constructor(
   private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
) {}
async createPost(post: Post){
    if(this.formValidation()) {
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();

    try{
      await this.firestore.collection("tab3").add(post);
    } catch(e){
      this.showToast(e);
    }
    //dismiss loader
    (await loader).dismiss();

    //redirect to contact
    this.navCtrl.navigateRoot("contact");
    }
  }
  
  formValidation(){
    if(!this.post.name){
      this.showToast("Enter name");
      return false;
    }

    if(!this.post.address){
      this.showToast("Enter address");
      return false;
    }

    if(!this.post.quantity){
      this.showToast("Enter quantity");
      return false;
    }

    if(!this.post.delivery){
      this.showToast("Enter delivery");
      return false;
    }

    return true;
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }

}
