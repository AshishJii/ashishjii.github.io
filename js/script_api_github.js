// Allow to show the repositories of the GitHub account in the portfolio section
$(document).ready(function() {
    const username = 'AshishJii';
    const settings = {
        'async': true,
        'crossDomain': true,
        // 'url': 'https://api.github.com/users/Ashishjii/repos?type=owner&sort=updated',
        'url' : `https://pinned.berrysauce.dev/get/${username}`,
        'method': 'GET',
        'headers': {}
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        const repositoriesToShow = 100;
        let repositoriesDisplayed = 0;

        for (let i = 0; i < response.length && repositoriesDisplayed < repositoriesToShow; i++) {
            const repo = response[i];
            
            if (!repo.fork) {
                const repoName = repo.name;
                const repoDescription = repo.description;
                const repoLanguage = repo.language;// === 'Visual Basic .NET' ? 'VB.NET' : (repo.language === 'JavaScript' ? 'JS' : repo.language);
                const repoUrl = `https://github.com/${username}/${repoName}`;
                const repoPublishDate = new Date(repo.created_at).toDateString();

                const repoCard = `
                    <div class='col-sm-12 col-md-6 col-lg-4 mt-4 d-flex align-items-stretch'>
                        <div class='card border-info'>
                            <div class='card-body opacity-0'>
                                <div class='d-flex justify-content-between mb-2'>
                                    <h6 class='card-subtitle text-warning text-uppercase'>${repoLanguage}</h6>
                                    <!--<h6 class='card-subtitle text-warning'>${repoPublishDate}</h6>-->
                                </div>
                                <a href='${repoUrl}' target='_blank' rel='noreferrer'>
                                    <h5 class='card-title text-white'>${repoName}</h5>
                                </a>
                                <p class='card-text mt-2'>${repoDescription}</p>
                            </div>
                        </div>
                    </div>
                `;

                $('#repository').append(repoCard);
                repositoriesDisplayed++;
            }
        }
    });
});
