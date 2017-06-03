extends ../layout

block content
  .container
    .row
      .col-md-5
        form(method="POST",action="/user/signin")
          .modal-body
            .form-group
              label(for="signinName") 用户名
              input#signinName.form-control(name="user[name]",type="text")
            .form-group
              label(for="signinPassword") 密码
              input#signinPassword.form-control(name="user[password]",type="text")
          .modal-footer
            button.btn.btn-default(type="button",data-dismiss="modal") 关闭
            button.btn.btn-success(type="submit") 提交