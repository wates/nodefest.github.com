$(function() {
  // ヘッダ画像のロールオーバー
  $imgs = $('.mod-pageHeader nav img');
  $imgs.headerNavi();

  // ページ遷移の設定
  $.LazyJaxDavis(function(router) {
    var $content = $('.mod-pageBody-main');

    router.bind('everyfetchstart', function(page) {
      window.scrollTo(0, 0);
      $content.css('opacity', 0.6);
    });

    router.bind('everyfetchsuccess', function(page) {
      var newcontent = page.rip('content');
      var $newcontent = $(newcontent).hide();
      $content.css('opacity', 1).empty().append($newcontent); 
      $newcontent.slideDown();
      $imgs.setCurrent();
      page.trigger('pageready');
    });
  });

  Nodefest.Model.Avatar.images = [
    './assets/img/mod-avatar/boy01.gif',
    './assets/img/mod-avatar/boy02.gif',
    './assets/img/mod-avatar/girl01.gif',
    './assets/img/mod-avatar/girl02.gif'
  ];

  var avatars = new Nodefest.Collection.Avatars();

  var avatarsField = new Nodefest.View.AvatarsField({
    collection: avatars,
    el: '#avatarField'
  });

  avatars.createMe();
  avatars.sync();
});