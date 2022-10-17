//load category sections

const loadNewsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}


//display category sections

const displayCategory = (categories) => {

    const newsCategory = document.getElementById('category');
    categories.forEach(item => {

        const newsLi = document.createElement('li');
        newsLi.classList.add('nav-item', 'd-block');
        newsLi.innerHTML = `
        <a onclick="loadNewsDetail('${item.category_id}')"class="nav-link" href="#">${item.category_name}</a>
        `;
        newsCategory.appendChild(newsLi);
    });
}


//load news detail data

const loadNewsDetail = (newsCode) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${newsCode}`
    //console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(response => {
            if (response.status) {
                displayNewsDetail(response.data)
            }
            else {
                const detailContainer = document.getElementById('detail-container');
                detailContainer.innerHTML = "<div class='alert alert-danger' style='text-align:center;'>NO DATA FOUND</div>";
            }
        });


};


//display news information in detailed and added no views and no author part

const displayNewsDetail = news => {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = "";
    news.forEach(newsItem => {

        const detailDiv = document.createElement('div');

        totalViews = newsItem.total_view;
        authorName = newsItem.author.name
        if (totalViews === null) {
            totalViews = "NO VIEW";
        }
        if (authorName === null) {
            authorName = "NO AUTHOR";
        }
        detailDiv.innerHTML = "";
        detailDiv.classList.add('card');
        details = newsItem.details.slice(0, 200).concat('...');

        detailDiv.innerHTML = ` 
        <div class="row">
            <div class="col-4">
                <img src="${newsItem.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                        <h5 class="card-title">${newsItem.title}</h5>
                        <p class="card-text">${details}</p>
                        </div>
                    </div>
                </div>
                       <br/>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3"> 
                                <img src="${newsItem.author.img}" class="rounded-circle" alt="..." style="width:40px; height:30px;">
                                <span style="font-size:12px;">${authorName} </span>
                            </div>
                            <div class="col-md-3">
                            <span class="fa fa-star"></span>
                                ${newsItem.rating.number}
                            </div>
                            <div class="col-md-3" style="font-size:14px;">
                            Views: ${totalViews}
                            </div>
                            <div class="col-md-3">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadNews('${newsItem._id}')">
                            News details
                          </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    `;

        detailContainer.appendChild(detailDiv);

    });
}

//display news detail with modal

function loadNews(newsId) {

    const titleID = document.getElementById('exampleModalLabel');
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            titleID.innerHTML = data.data[0].title;
            detailsModalData.innerHTML = data.data[0].details
            detailOther.innerHTML = data.data[0].others_info.is_trending
        })

}



loadNewsCategory();