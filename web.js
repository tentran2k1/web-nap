$(function () {
	var section = $("#web-header");
	var tabItems = section.find(".list-items .MS__hover");
	var pcDetails = section.find(".item-detail.MS__pc");
	var mbDetails = section.find(".item-detail.MS__mb");

	var gameSelect = $("#game-select");
	var loginSelect = $("#login-select");
	var package1Select = $("#package-1-select");
	var package2Select = $("#package-2-select");
	var isEnglish = $("body").hasClass("en");

	var text = {
		loginPlaceholder: isEnglish ? "-- Select login gateway --" : "-- Chọn cổng đăng nhập --",
		packagePlaceholder: isEnglish ? "Select package" : "Chọn gói nạp",
		gamePlaceholder: isEnglish ? "-- Select game --" : "-- Chọn game --",
	};

	var gameData = [
		{
			name: "LIGHT AND NIGHT",
			packages: [
				"2 Polaris",
				"10 Polaris",
				"31 Polaris",
				"56 Polaris",
				"116 Polaris",
				"216 Polaris",
				"Monthly Card",
			],
			logins: ["Gmail", "Apple", "Facebook", "Wechat", "X (Twitter)"],
		},
		{
			name: "Love and Deepspace",
			packages: [
				"60 Crystals",
				"300 Crystals",
				"450 Crystals",
				"980 Crystals",
				"1980 Crystals",
				"3280 Crystals",
				"6480 Crystals",
				"Aurum Pass",
			],
			logins: ["Gmail", "Apple", "Facebook", "Wechat", "X (Twitter)"],
		},
		{
			name: "Infinity Nikki",
			packages: [
				"60 Stellarite",
				"300 Stellarite",
				"980 Stellarite",
				"1980 Stellarite",
				"3280 Stellarite",
				"6480 Stellarite",
				"Monthly Card",
				"Weekly Card",
			],
			logins: ["Gmail", "Apple", "Facebook", "Wechat", "X (Twitter)"],
		},
		{
			name: "Life Makeover",
			packages: [
				"60 Coupons",
				"300 Coupons",
				"980 Coupons",
				"1980 Coupons",
				"3280 Coupons",
				"6480 Coupons",
				"12980 Coupons",
				"Membership",
			],
			logins: ["Gmail", "Apple", "Facebook", "Wechat", "X (Twitter)"],
		},
		{
			name: "Identity V",
			packages: [
				"60 Echoes",
				"185 Echoes",
				"305 Echoes",
				"690 Echoes",
				"2025 Echoes",
				"3330 Echoes",
				"6590 Echoes",
			],
			logins: ["Gmail", "Apple", "Facebook", "Wechat", "X (Twitter)"],
		},
	];

	function fillSelect($select, options, placeholder) {
		var html = '<option value="">' + placeholder + "</option>";
		options.forEach(function (optionText) {
			html += '<option value="' + optionText + '">' + optionText + "</option>";
		});
		$select.html(html);
	}

	function activateTab(index) {
		tabItems.removeClass("is-active");
		tabItems.eq(index).addClass("is-active");

		pcDetails.addClass("Hide").eq(index).removeClass("Hide");
		mbDetails.addClass("Hide").eq(index).removeClass("Hide");
	}

	function updatePackage2Options() {
		var gameIndex = Number(gameSelect.val() || 0);
		var selectedPackage1 = package1Select.val();

		if (!gameData[gameIndex]) {
			fillSelect(package2Select, [], text.packagePlaceholder);
			return;
		}

		var package2Options = gameData[gameIndex].packages.filter(function (pkg) {
			return pkg !== selectedPackage1;
		});

		fillSelect(package2Select, package2Options, text.packagePlaceholder);
	}

	function applyGame(index) {
		if (!gameData[index]) {
			return;
		}

		gameSelect.val(String(index));
		fillSelect(loginSelect, gameData[index].logins, text.loginPlaceholder);
		fillSelect(package1Select, gameData[index].packages, text.packagePlaceholder);
		updatePackage2Options();
		activateTab(index);
	}

	var gameNames = gameData.map(function (game) {
		return game.name;
	});

	fillSelect(gameSelect, gameNames, text.gamePlaceholder);
	gameSelect.find("option").each(function (index) {
		if (index > 0) {
			$(this).attr("value", String(index - 1));
		}
	});

	tabItems.each(function (index) {
		$(this).on("click", function (event) {
			event.preventDefault();
			applyGame(index);
		});
	});

	gameSelect.on("change", function () {
		applyGame(Number($(this).val() || 0));
	});

	package1Select.on("change", updatePackage2Options);

	applyGame(0);

	section.find("form.form").on("submit", function (event) {
		event.preventDefault();

		if (window.jQuery && window.jQuery.fancybox && window.jQuery.fancybox.open) {
			window.jQuery.fancybox.open({ src: "#success-modal", type: "inline" });
		} else if (typeof window.Fancybox !== "undefined" && typeof window.Fancybox.show === "function") {
			window.Fancybox.show([{ src: "#success-modal", type: "inline" }]);
		} else if (typeof window.Fancybox !== "undefined" && typeof window.Fancybox.open === "function") {
			window.Fancybox.open({ src: "#success-modal", type: "inline" });
		} else {
			alert("Gửi thông tin thành công");
		}

		this.reset();
		applyGame(0);
	});
});

window.addEventListener("load", function () {});