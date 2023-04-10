$(document).ready(function() {

    let baseUrl = window.location.origin;



    setTimeout(() => {
        getDetails('all')
    }, 2000);

    function getDetails(filterby) {
        $.ajax({
            url : "./public/json/teams-details.json",
            method : 'get'
        }).done(function(res){
            $('.load-container').addClass('d-none');
            let result;
            let content = '';
            if (filterby === 'all') {
                result = res
            } else {
                result = res.filter(item => {
                    return (item.t_name.toLowerCase() === filterby.toLowerCase()) ? item : ''
                });
            }
            if (result.length > 0) {
                $.each(result,function(ind,val){
                    content += `
                    <div class="col-lg-4 mb-4">
                        <div class="card team_card border-0 h-100" data-team-name="${val.t_name}">
                            <img src="./public/images/${val.img}" class="img-fluid" alt="csk">
                            <div class="card-body">
                                <h6>${val.t_name}</h6>
                                <p class="mb-2">${val.desc}</p>
                                <p class="mb-0 winning_titles d-flex align-items-center">
                                    <i class="fa-solid fa-trophy"></i>
                                    Winner Titles : <span>${val.winning_titles}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                })
            }else {
                
                content += `
                    <div class='not_avail'>
                        <p class="text-center">No Data</p>
                    </div>
                    `
            }
            $('#teams_wrapper').html(content)
        }).fail(function(res){
            console.log(res);
        })
    }


    $("#search-btn").on("click",function(e) {
        let value = $("#search-input").val();
        console.log(value);
        getDetails(value)
    })


    var swiper = new Swiper(".mySwiper", {
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: false,
        navigation: false,
    });


    $("body").on("click",".team_card",function(e){
        e.preventDefault();

        let team = $(this).attr("data-team-name");

        window.location.href = `./team_details.html?team=${team}`

    })
    

})