document.addEventListener("DOMContentLoaded", function() {
    const modalPostList = $("#modalPostList");

    modalPostList.on('show.bs.modal', function (event) {
        const currentBtn = $(event.relatedTarget);
        const title = currentBtn.data("title");
        const body = currentBtn.data("body");
        const cta = currentBtn.data("cta");
        const link = currentBtn.data("href");

        const modal = $(this);
        modal.find(".modal-title").text(title);
        modal.find(".modal-body").text(body);
        modal.find(".cta").text(cta).attr('href', link);

        if(currentBtn[0].id === 'btn-delete') {
            modal.find(".cta").removeClass('btn-info').addClass('btn-danger');
        } else {
            modal.find(".cta").addClass('btn-info').removeClass('btn-danger');
        }
      })
});