$(document).ready(function() {

    let baseUrl = window.location.origin;


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const team = urlParams.get('team')

    team_details(team);
    
    function team_details(filterby) {
        $.ajax({
            url : "./public/json/teams-details.json",
            method : 'get'
        }).done(function(res){
            let result;
            let content = '';
            console.log(filterby);
            result = res.filter(item => {
                return (item.t_name.toLowerCase() === filterby.toLowerCase()) ? item : ''
            });

            if (result.length > 0) {
                $.each(result,function(ind,val){
                    content += `
                    <div class="col-lg-4 border-right mb-4 px-lg-4 mb-lg-0 py-lg-3">
                        <img src="./public/images/team/${val.logo}" class="img-fluid" alt="logo">
                    </div>
                    <div class="col-lg-4 border-right mb-4 px-lg-4 mb-lg-0 py-lg-3">
                        <div class="card bg-transparent border-0 h-100">
                            <h4>${val.t_name}</h4>
                            <a href="${val.official}" class="btn btn-blue mt-4">Official Site</a>
                        </div>
                    </div>
                    <div class="col-lg-4 border-right mb-4 px-lg-4 mb-lg-0 py-lg-3">
                        <p>No of Title Winning : ${val.winning_titles}</p>
                        <p>Play Count : ${val.players_count}</p>
                        <p class="d-flex align-items-center line-2">
                            ${val.desc}
                        </p>
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
            
            $('#team_info').html(content)
        }).fail(function(res){
            console.log(res);
        })
    }


    players(team)

    function players(filterby) {
        $.ajax({
            url : "./public/json/teams-details.json",
            method : 'get'
        }).done(function(res){
            let result;
            let content = '';
            let blower = "";

            result = res.filter(item => {
                return (item.t_name.toLowerCase() === filterby.toLowerCase()) ? item : ''
            });

            if (result.length > 0) {
                $.each(result,function(ind,val){
                    $.each(val.top_batmans,function(ind,val){
                        content += `
                        <div class="col-lg-3 mb-4">
                            <div class="players_card" data-player-name = "${val.name}">
                                <div class="card-img">
                                    <img src="./public/images/team/${val.role === "Batman" ? "teams-batsman-icon.svg" : "teams-wicket-keeper-icon.svg"}" class="img-fluid icon" alt="icon">
                                    <img src="./public/images/team/${val.img}" class="img-fluid" alt="players image">
                                </div>
                                <div class="card-body py-3">
                                    <h4 class="text-center">${val.name}</h4>
                                    <p class="text-center mb-0">${val.role}</p>
                                </div>
                            </div>
                        </div>     `
                    })

                    $.each(val.top_blowers,function(ind,val){
                        blower += `
                        <div class="col-lg-3 mb-4">
                            <div class="players_card" data-player-name = "${val.name}">
                                <div class="card-img">
                                    <img src="./public/images/team/teams-bowler-icon.svg" class="img-fluid icon" alt="icon">
                                    <img src="./public/images/team/${val.img}" class="img-fluid" alt="players image">
                                </div>
                                <div class="card-body py-3">
                                    <h4 class="text-center">${val.name}</h4>
                                    <p class="text-center mb-0">${val.role}</p>
                                </div>
                            </div>
                        </div>     `
                    })
                })
            }else {
                
                content += `
                    <div class='not_avail'>
                        <p class="text-center">No Data</p>
                    </div>
                    `
            }
            console.log(content);
            
            $('#top_batmans').html(content)
            $('#top_blowers').html(blower)

        }).fail(function(res){
            console.log(res);
        })
    }

})