// // // main.js
// register.js

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('text').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('errorMessage').textContent = 'كلمة المرور وتأكيد كلمة المرور غير متطابقتين.';
          errorMessage.style.display = 'block';
        return;
    }

    const newUser = {
        text :text,
        email : email,
        password: password
    };

    // جلب المستخدمين المخزنين أو تعيين مصفوفة فارغة إذا لم تكن موجودة
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        document.getElementById('errorMessage').textContent = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
        errorMessage.style.display = 'block';
    }
});
// product.js
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        document.getElementById('sellerInfo').textContent = '';
    

    document.getElementById('productForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const DescribtionProduct = document.getElementById('DescribtionProduct').value;
        const phonenumber = document.getElementById('phonenumber').value;

        const productImage = document.getElementById('productImage').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const newProduct = {
                id: Date.now(), // Unique ID
                name: productName,
                price: productPrice,
                DescribtionProduct:DescribtionProduct,
                number:phonenumber,
                image: event.target.result,
                seller: currentUser.text // Assuming currentUser has an email property
            };

            // جلب المنتجات المخزنة أو تعيين مصفوفة فارغة إذا لم تكن موجودة
            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            // إعادة تعيين النموذج
            document.getElementById('productForm').reset();

            // عرض المنتجات
            displayProducts();
        };
        reader.readAsDataURL(productImage);
    });

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productDiv.appendChild(productImage);

            const productName = document.createElement('h3');
            productName.textContent = product.name;
            productDiv.appendChild(productName);

            const productPrice = document.createElement('p');
            productPrice.textContent = `السعر: ${product.price} $`;
            productDiv.appendChild(productPrice);
            const DescribtionProduct = document.createElement('p');
            DescribtionProduct.textContent = `الوصف: ${product.DescribtionProduct} `;
            productDiv.appendChild(DescribtionProduct);
            const productSeller = document.createElement('p');
            productSeller.textContent = `البائع: ${product.seller}`;
            productDiv.appendChild(productSeller);
            const phonenumber = document.createElement('p');
            phonenumber.textContent = `رقم الهاتف: ${product.number} `;
            productDiv.appendChild(phonenumber);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'حذف';
            deleteButton.addEventListener('click', function() {
                deleteProduct(product.id);
            });
            productDiv.appendChild(deleteButton);

            productsList.appendChild(productDiv);
        });
    }

    function deleteProduct(productId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = products.filter(product => {
            if (product.id === productId && product.seller === currentUser.text) {
                return false; // Remove product if it matches the ID and seller email
            }
            return true;
        });
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        displayProducts();
    }

    // عرض المنتجات عند تحميل الصفحة
    displayProducts();
});
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
 
    document.getElementById('commentForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const comment = document.getElementById('comment').value;

        const newComment = {
            id: Date.now(), // Unique ID
            user: currentUser.text, // Assuming currentUser has an email property
            comment: comment
        };

        // جلب التعليقات المخزنة أو تعيين مصفوفة فارغة إذا لم تكن موجودة
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));

        // إعادة تعيين النموذج
        document.getElementById('commentForm').reset();

        // عرض التعليقات
        displayComments();
    });

    function displayComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '';

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            const commentUser = document.createElement('h3');
            commentUser.textContent = comment.user;
            commentDiv.appendChild(commentUser);

            const commentText = document.createElement('p');
            commentText.textContent = comment.comment;
            commentDiv.appendChild(commentText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'حذف';
            deleteButton.addEventListener('click', function() {
                deleteComment(comment.id);
            });
            commentDiv.appendChild(deleteButton);

            commentsList.appendChild(commentDiv);
        });
    }

    function deleteComment(commentId) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const updatedComments = comments.filter(comment => {
           if (comment.id === commentId && comment.user === currentUser.text) {
                return false; // Remove comment if it matches the ID and user 
            }
                
            return true;
        });
        localStorage.setItem('comments', JSON.stringify(updatedComments));
        displayComments();
    }



    // عرض التعليقات عند تحميل الصفحة
    displayComments();
});



document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    // بيانات المنتجات
    const products = [
        {
            name: 'realme c53',
            description: 'realmec53 dual sim phone 256GB rom and 8 ram 4G',
            price: '$105',
            image: 'img//realme.png',
            state:' new'
        },
        {
            name: 'realme GT 6T',
            description: 'Realme GT 6T 256GB ROM 12GB RAM 5G',
            price: '$120',
            image: 'img/gt.png',
            state:' new'

        },
        {
            name: 'realme 11',
            description: 'realme 11 256GB ROM 8 GB RAM 5G',
            price: '$160',
            image: 'IMG//11.png' ,            
            state:' new'

        }, {
            name: 'realme note 50',
            description: 'realme note 50 64GB ROM 3GB RAM 4G',
            price: '$100',
            image: 'img//not 50.png'
        }, {
            name: 'iphone 14 plus',
            description: 'iphone 14 plus 128 GB color black                                                ',
            price: '$450',
            image: 'img//iphone 14.png',
            state:' used'

        }, {
            name: 'iphone 15',
            description: 'iphone 15 128GB dual sim phone color green ',
            price: '$350',
            image: 'img//iphone15.png',
            state:' used'

        }, {
            name: 'iphone 13',
            description: 'iphone 13 128GB dual sim phone color white  ',
            price: '$300',
            image: 'img/iphone13.png',
            state:' new'

        }, {
            name: 'iphone 11',
            description: 'iphone 128GB ROM 4GB RAM color white',
            price: '$400',
            image: 'img/iphone12.png',
            state:' new'

        }
        // يمكنك إضافة المزيد من المنتجات هنا
    ];

    // إنشاء بطاقة منتج
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                
                <p class="price">${product.state}</p>
                <p class="price">${product.price}</p>

<a href="https://wa.me/1234567890" class="btn">Buy Now</a>
            </div>
        `;

        return card;
    }

    // إضافة بطاقات المنتجات إلى القائمة
    products.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    });
});
