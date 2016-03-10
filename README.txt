g4xiongy Yilin Xiong
g4yesiya Siyang Ye
g4yuzhe Zhe Yu
g4xiaowe Wen Xiao

====================== Start ==========================
$npm install
$npm start

======================= home page ======================
--Login
	use emails and passwords stored in user.service.ts
	login status is not preserved during refreshing.
--Product details
	clicking any of the 3 images above <button>View More</button> will show product details and user rating/comments.
--Search
	type anything in the textbox and search. Results listed are not clickable (i.e. clicking will redirect back to home page).

======================= admin page =======================
--Login
	username: admin
	password: admin

====================== Trouble Shooting ===============
--lite-server error
	$npm install
	$sudo npm update -g && sudo npm install -g concurrently lite-server typescript
	$npm unistall lite-server
	$npm start
