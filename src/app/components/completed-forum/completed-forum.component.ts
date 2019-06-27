import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { CommonComponentService } from '../common-component.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-completed-forum',
  templateUrl: './completed-forum.component.html',
  styleUrls: ['./completed-forum.component.scss']
})
export class CompletedForumComponent implements OnInit {
public replyBox = false; token;showCoomentArea=false
  public txtcommentSub: string

  public show: boolean = false;
  public prevClicked: number = -1; jsonObj = {};
  public counter: Number;
  public subcomments = false; allPosts = {};
  public comments = []; userName;
  public disableCommentSubmit; mainPosts;
  public commentFlag = false; viewCommentFlag = false;
  constructor(public CommonComponentService: CommonComponentService, public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef,  public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.replyBox = false;
  }
  @Output() public sendData = new EventEmitter<any>();

  posts = [{ 'comment': 'first comment', 'show': false, 'type': 'comment', 'viewComments': false }];

  ngOnInit() {

    this.comments = [];
    this.posts = [];
    this.replyBox = false;
    this.counter = 3;
    this.token = window.localStorage.getItem('token');
    if (this.token == null) {
      this.router.navigate(['/']);
    }
    this.commentFlag = false;
    this.viewCommentFlag = false;
    this.getPosts("modulefivepostdisplay/", 1);
    this.userName = window.localStorage.getItem('name')

  }
  addHero(newHero, index) {
    newHero = newHero.replace(/"/g, "'");
    newHero = newHero.replace(/(?:\r\n|\r|\n)/g, ' ');
    var str = '{"comment":"' + newHero + '","show":false,"type":"comment"}';

    this.posts.splice(index + 1, 0, JSON.parse(str))
    this.txtcommentSub = '';
    this.replyBox = false;
  }
  showMore() {
    this.getPosts(this.allPosts['next'], 2);
  }

  less() {
    this.counter = Number(this.counter) - 3;
  }
  subComment(postid, i) {
    if (this.commentFlag == true) {
      this.posts[i].show = true;

      this.addCommentBox(i);
      if (this.posts[i].type == 'post') {
        if (this.viewCommentFlag == false) {
          this.viewCommentFlag = true;
          this.viewComments(postid, i);
          this.posts[i].viewComments = true;
        }
        this.posts[i].viewComments = true;
        this.viewCommentFlag = true;
      }
    } else {
      if (this.posts[i].type == 'post') {
        this.posts[i].show = false;
        this.viewCommentFlag = false;
        this.removeCommentBox(i);
        this.removeAllComments(i, postid);
      } else {
        this.posts[i].show = false;
      }
    }
  }
  getPosts(url, call) {
    this.CommonComponentService.getForumPostDetails(url, call)
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.allPosts = data;
          this.mainPosts = data["data"].posts;
          this.posts.push.apply(this.posts, data['data'].posts);
          this.posts.forEach(element => {
            element.show = false;
            element.type = "post";
            element.viewComments = false;
          });

        }
        else if (data['message'] == 'posts not found')
        {
          this.sendData.emit(true)
          this.toastr.error(this.translate.instant('Errors.noPost'));
        }
      },
      error => {
        if (error.json().message == 'token not found' || error.json().message == 'token not match') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500)

        } else if (error.json().message == 'json Key Error') {
          this.toastr.error(this.translate.instant('Errors.wrongInfo'));
        }
        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
      });
  }

  viewComments(postid, index) {
    console.log(postid,index,this.viewCommentFlag)
    if (this.viewCommentFlag == true) {
      this.viewAllComments(index, postid);
    } else {
      this.removeAllComments(index, postid);
    }

  }

  setComment(cmmt, postid, refCommentId, index) {

    var jsonBody = {};
    jsonBody['postid'] = postid;
    jsonBody['comment'] = cmmt;
    if (refCommentId != null) {
      jsonBody['refCommentId'] = refCommentId;
    } else {
      jsonBody['refCommentId'] = null;

    }


    this.CommonComponentService.viewComment(jsonBody, 'modulefivecomment/')
      .subscribe(
      data => {
        if (data['message'] == "comment submitted successfully") {

          this.txtcommentSub = "";

          this.commentFlag = false;
          this.posts[index].viewComments = false;
          var indexof = this.posts.findIndex(x => x['postid'] == postid);
          this.posts[indexof].show = false;
          this.removeAllComments(indexof, postid);
          setTimeout(() => {
            this.viewAllComments(indexof, postid);
          }, 100);
        }
      },
      error => {
        if (error.json().message == 'token not found' || error.json().message == 'token not match') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500)
        } else if (error.json().message == 'json Key Error') {
          this.toastr.error(this.translate.instant('Errors.wrongInfo'));
        }
        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
      });

  }
  ngDoCheck() {
    if (this.txtcommentSub != undefined) {
      if (Object.keys(this.txtcommentSub.trim()).length == 0) {
        this.disableCommentSubmit = true;
      } else {
        this.txtcommentSub = this.txtcommentSub.trim();
        this.disableCommentSubmit = false;
      }
    } else {
      this.disableCommentSubmit = true;
    }

    if(this.viewCommentFlag == false){
      // this.post=
    }
  }
  viewAllComments(index, postid) {

    var jsonBody = {};
    jsonBody['postid'] = postid;
    this.CommonComponentService.viewComment(jsonBody, 'modulefivegetcomments/')
      .subscribe(
      data => {
        if (data['message'] == "ok") {

          this.comments =[]
            this.comments = data['data'].comments;
          this.comments.forEach(element => {

            element.show = false;
            element.type = "comment";
            element.viewComments = false;
          });
          this.posts[index]["comment_count"] = this.comments.length;

          var temp1 = []
          temp1 = this.posts.slice(0, index + 1);
          var temp2 = []
          temp2 = this.posts.slice(index + 1);
          //           console.log("post2 ",temp2)
          temp1.push.apply(temp1, this.comments);
          temp1.push.apply(temp1, temp2);
          //           console.log("post 3",this.posts)

          this.posts = [];
          this.posts = temp1;
          console.log("post ",this.posts)

        } else if (data['message'] == "no comments") {
        }
        this.posts[index].viewComments = true;
      },
      error => {
        if (error.json().message == 'token not found' || error.json().message == 'token not match') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500)
        } else if (error.json().message == 'json Key Error') {
          this.toastr.error(this.translate.instant('Errors.wrongInfo'));
        }
        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }

      });
  }
  removeAllComments(index, postid) {
    console.log("1 ",index,postid)
    this.posts[index].viewComments = false;
    var count = 0;
    this.posts.forEach((elem, index2) => {
      if (elem['postid'] == postid) {
        count++;
      }
    })

    var at=[]
    var index1 = 0;

   for(let i of this.posts){
    //  console.log("saSA ",i['postid'],i['type'])
     if(i['postId']==postid && i['type']=='comment'){
     at.push(index1)
    //  this.posts.findIndex()

     }
  index1++
   }
   console.log("at ",at,at[0],at[(at.length)-1])
   this.posts.splice(at[0],(at.length))
    console.log("saSAsaSAs ",this.posts)

  //   var temp1 = this.posts.slice(0, index + 1);
  //   console.log("2 ",temp1)
  //   var temp2 = this.posts.slice(index + count);
  //       console.log("4 ",temp1[(temp1.length)-1]['commentCount'])
  //      var du={}
  //       du=temp2.splice(temp1[(temp1.length)-1]['commentCount'],temp2.length)

  //       var arry=[]
  //   // temp1.push.apply(temp1, du);
  //       arry.push.apply(temp1, du);


  //   // temp2.forEach(function(result, index) {
  //   // if(result['type'] === 'comment') {
  //     //Remove from array
  //     console.log("arr: ",du)
  // //     // array.splice(index, 1);
  // //   }
  // // });

  //     // });

  //   // for(let item of temp2)
  //   //   {
  //       console.log(index)

  //     // }

  //   console.log("5 ",temp1)
  //   this.posts = [];
  //   this.posts = temp1;

    this.posts[index].viewComments = false;
  }
  addCommentBox(index) {
    this.replyBox = true;
  }
  removeCommentBox(index) {
    this.replyBox = false;
  }

}
