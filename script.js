document.addEventListener("DOMContentLoaded", function() {
    const publishBtn = document.getElementById('publish-btn');
    const articleForm = document.getElementById('article-form');
    const articlesList = document.getElementById('articles-list');

    if (publishBtn) {
        publishBtn.addEventListener('click', publishArticle);
    } else {
        console.error('Publish button not found.');
    }

    function publishArticle(event) {
        event.preventDefault();

        const authorName = document.getElementById('author-name').value;
        const authorAge = document.getElementById('author-age').value;
        const authorCountry = document.getElementById('author-country').value;
        const articleContent = document.getElementById('article-content').value;
        const publishDate = new Date().toLocaleDateString();

        if (authorName && authorAge && authorCountry && articleContent) {
            const article = {
                authorName,
                authorAge,
                authorCountry,
                articleContent,
                publishDate
            };

            saveArticle(article);
            displayArticles();
            clearForm();
        } else {
            alert('Please fill in all fields.');
        }
    }

    function saveArticle(article) {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles.push(article);
        localStorage.setItem('articles', JSON.stringify(articles));
    }

    function displayArticles() {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        articlesList.innerHTML = '';

        articles.forEach((article, index) => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            const articleInfo = document.createElement('div');
            articleInfo.classList.add('article-info');
            articleInfo.textContent = `${article.authorName}, ${article.authorAge}, ${article.authorCountry}, ${article.publishDate}`;

            const articleContent = document.createElement('p');
            articleContent.textContent = article.articleContent;

            const editButton = document.createElement('button');
            editButton.textContent = 'تعديل';
            editButton.addEventListener('click', () => editArticle(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'حذف';
            deleteButton.addEventListener('click', () => deleteArticle(index));

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('article-buttons');
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            articleDiv.appendChild(articleInfo);
            articleDiv.appendChild(articleContent);
            articleDiv.appendChild(buttonContainer);

            articlesList.appendChild(articleDiv);
        });
    }

    function editArticle(index) {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        const article = articles[index];

        document.getElementById('author-name').value = article.authorName;
        document.getElementById('author-age').value = article.authorAge;
        document.getElementById('author-country').value = article.authorCountry;
        document.getElementById('article-content').value = article.articleContent;

        articles.splice(index, 1);
        localStorage.setItem('articles', JSON.stringify(articles));
        displayArticles();
    }

    function deleteArticle(index) {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles.splice(index, 1);
        localStorage.setItem('articles', JSON.stringify(articles));
        displayArticles();
    }

    function clearForm() {
        document.getElementById('author-name').value = '';
        document.getElementById('author-age').value = '';
        document.getElementById('author-country').value = '';
        document.getElementById('article-content').value = '';
    }

    displayArticles();
});
