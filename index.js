const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));

const accounts = [{ username: "tes" }];

app.get("/account/:username", function (req, res) {
	const account = accounts.find(function (a) {
		return a.username == req.params.username;
	});
	if (!account) {
		return res.status(404).send({ msg: "Not found" });
	}
	return res.status(200).send(account);
});

app.post("/account/", upload.single("pic"), function (req, res) {
	let account = accounts.find(function (a) {
		return a.username == req.body.username;
	});
	if (account) {
		return res.status(400).send({ msg: "Username already taken" });
	}
	const newFileName = "./uploads/" + req.body.username + ".jpg";
	fs.renameSync(`./uploads/${req.file.filename}`, newFileName);
	account = { username: req.body.username };
	accounts.push(account);
	return res.status(200).send(account);
});

app.put("/account/:username", upload.single("pic"), function (req, res) {
	const account = accounts.find(function (a) {
		return a.username == req.params.username;
	});
	if (!account) {
		return res.status(404).send({ msg: "Not found" });
	}
	return res.status(200).send(account);
});

app.delete("/account/:username", function (req, res) {
	let account = accounts.findIndex(function (a) {
		return a.username == req.params.username;
	});
	if (account == -1) {
		return res.status(404).send({ msg: "Not found" });
	}
	account = accounts.splice(account, 1)[0];
	return res.status(200).send(account);
});

const port = 3000;
app.listen(port, function () {
	console.log(`listening on port ${port}...`);
});
