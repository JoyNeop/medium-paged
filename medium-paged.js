window.MEDIUM_PAGED_APP = {
	runtime: {
		currentPage: 1
	}
};

(function () {
	MEDIUM_PAGED_APP.ui = (function () {
		var div = document.createElement('div');
		div.setAttribute('id', 'JNMPA-UI-container')
		div.innerHTML = [
			'<div id="JNMPA-UI-container_inner" style="">',
				'<div id="JNMPA-UI-content" class="postArticle-content" style="overflow: scroll;">',
				'</div>',
				'<div id="JNMPA-UI-controls">',
					'<div id="JNMPA-UI-controls_inner">',
						'<div id="JNMPA-UI-controls-close">',
							'Exit',
						'</div>',
						'<div id="JNMPA-UI-controls-paging">',
							'<div id="JNMPA-UI-controls-paging-prev">',
								'<span style="-webkit-transform: rotateZ(90deg) translateX(4px);" class="svgIcon svgIcon--arrowDown svgIcon--19px is-flushRight"><svg class="svgIcon-use" width="19" height="19" viewBox="0 0 19 19"><path fill="#333" d="M3.9 6.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L4.753 6z" fill-rule="evenodd"></path></svg></span>',
								' Prev',
							'</div>',
							'<div id="JNMPA-UI-controls-paging-current">',
								'**/**',
							'</div>',
							'<div id="JNMPA-UI-controls-paging-next">',
								'Next ',
								'<span style="-webkit-transform: rotateZ(-90deg) translateX(-4px);" class="svgIcon svgIcon--arrowDown svgIcon--19px is-flushRight"><svg class="svgIcon-use" width="19" height="19" viewBox="0 0 19 19"><path fill="#333" d="M3.9 6.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L4.753 6z" fill-rule="evenodd"></path></svg></span>',
							'</div>',
						'</div>',
					'</div>',
				'</div>',
			'</div>',
		''].join('');
		return div;
	})();
	MEDIUM_PAGED_APP.methods = {
		init: function () {
			// Read from the content
			MEDIUM_PAGED_APP.contentSectionOuter = document.querySelectorAll('.section-content')[0];
			MEDIUM_PAGED_APP.contentSectionInner = document.querySelectorAll('.section-content > .section-inner.layoutSingleColumn > *, .section-content > .section-inner.sectionLayout--outsetColumn > *');
			MEDIUM_PAGED_APP.imaginaryOriginalContent = document.createElement('div');
			MEDIUM_PAGED_APP.imaginaryOriginalContent.setAttribute('id', 'JNMPA-Addon-duplicate');
			MEDIUM_PAGED_APP.imaginaryOriginalContent.setAttribute('class', 'postArticle-content section-inner');
			MEDIUM_PAGED_APP.imaginaryOriginalContent.style.opacity = '0.5';
			MEDIUM_PAGED_APP.imaginaryOriginalContent.innerHTML = (function (nodes) {
				var innerhtml_ = [].map.call(nodes, function (n) {
					return n.outerHTML;
				}).join('');
				return innerhtml_;
			})(MEDIUM_PAGED_APP.contentSectionInner);
			MEDIUM_PAGED_APP.contentSectionOuter.appendChild(MEDIUM_PAGED_APP.imaginaryOriginalContent);

			// Put into pages (data)
			MEDIUM_PAGED_APP.pagesData = (function (originalContentArr, duplicatedContentArr) {
				window.innerHeight;
				var pagesData = [[]];
				var maxAllowedHeight = window.innerHeight - 170;
				var currentPageHeight = 0;
				for (var i = 0; i < originalContentArr.length; i++) {
					if (currentPageHeight + originalContentArr[i].offsetHeight <= maxAllowedHeight) {
						// Can put in current
						pagesData[pagesData.length-1].push(duplicatedContentArr[i]);
						currentPageHeight += originalContentArr[i].offsetHeight + 29;
					} else {
						// Must put into next
						pagesData.push([duplicatedContentArr[i]]);
						currentPageHeight = originalContentArr[i].offsetHeight + 29;
					};
				};
				return pagesData;
			})(MEDIUM_PAGED_APP.contentSectionInner, MEDIUM_PAGED_APP.imaginaryOriginalContent.children);

			// Put into pages (DOM)
			MEDIUM_PAGED_APP.pagesDOM = (function (pagesData) {
				var pagesDOM_ = document.createElement('div');
				pagesDOM_.setAttribute('id', 'JNMPA-UI-content_inner');
				pagesData.map(function (page_, index_) {
					var dom_ = document.createElement('div');
					dom_.setAttribute('data-page-index', index_ + 1);
					for (var i = 0; i < page_.length; i++) {
						dom_.appendChild(page_[i]);
					};
					return dom_;
				}).map(function (dom_) {
					pagesDOM_.appendChild(dom_);
				});
				return pagesDOM_;
			})(MEDIUM_PAGED_APP.pagesData);

			// Append into body
			document.body.appendChild(MEDIUM_PAGED_APP.ui);

			// After appending to body
			document.getElementsByTagName('html')[0].setAttribute('data-overflow-hidden', 'hidden');
			document.getElementById('JNMPA-UI-content').appendChild(MEDIUM_PAGED_APP.pagesDOM);
			document.getElementById('JNMPA-UI-content_inner').style.width = '800px';
			document.getElementById('JNMPA-UI-content').style.height = (window.innerHeight - 64) + 'px';
			document.getElementById('JNMPA-UI-controls-close').addEventListener('click', function () {
				MEDIUM_PAGED_APP.methods.close();
			});
			document.getElementById('JNMPA-UI-controls-paging-prev').addEventListener('click', function () {
				MEDIUM_PAGED_APP.methods.pagePrev();
			});
			document.getElementById('JNMPA-UI-controls-paging-next').addEventListener('click', function () {
				MEDIUM_PAGED_APP.methods.pageNext();
			});

			// Create global <style> elements
			(function () {
				// Use to determine which page to display
				var st1 = document.createElement('style');
				st1.setAttribute('id', 'JNMPA-CSS-Global_1');
				document.head.appendChild(st1);
				// Include external CSS
				var st2 = document.createElement('link');
				st2.setAttribute('id', 'JNMPA-CSS-Global_2');
				st2.setAttribute('rel', 'stylesheet');
				st2.setAttribute('href', 'https://cdn.rawgit.com/JoyNeop/medium-paged/master/medium-paged.css');
				document.head.appendChild(st2);
			})();

			// Update global CSS to show the 1st page
			MEDIUM_PAGED_APP.methods.movePage(1);

			// Listen to keydown events
			if (!window.JNMPA_EVENTS_LISTENED) {
				document.addEventListener('keydown', function (ev_) {
					if (ev_.keyIdentifier === 'Left') {
						MEDIUM_PAGED_APP.methods.pagePrev();
					} else if (ev_.keyIdentifier === 'Right') {
						MEDIUM_PAGED_APP.methods.pageNext();
					} else if (ev_.keyIdentifier === 'U+0045') {
						MEDIUM_PAGED_APP.methods.close();
					};
				});
				window.JNMPA_EVENTS_LISTENED = true;
			};

		},
		updateControls: function (destPage) {
			document.getElementById('JNMPA-UI-controls-paging-current').innerHTML = 'C/A'.replace('C', MEDIUM_PAGED_APP.runtime.currentPage).replace('A', MEDIUM_PAGED_APP.pagesData.length);
			if (MEDIUM_PAGED_APP.runtime.currentPage === 1) {
				// First page; hide prev
				document.getElementById('JNMPA-UI-controls-paging-prev').style.opacity = '0.1';
				document.getElementById('JNMPA-UI-controls-paging-next').style.opacity = '1';
			} else if (MEDIUM_PAGED_APP.runtime.currentPage === MEDIUM_PAGED_APP.pagesData.length) {
				// Last page; hide next
				document.getElementById('JNMPA-UI-controls-paging-prev').style.opacity = '1';
				document.getElementById('JNMPA-UI-controls-paging-next').style.opacity = '0.1';
			} else {
				document.getElementById('JNMPA-UI-controls-paging-prev').style.opacity = '1';
				document.getElementById('JNMPA-UI-controls-paging-next').style.opacity = '1';
			}
		},
		movePage: function (destPage) {
			if (typeof destPage !== 'number' || destPage < 1 || destPage % 1 !== 0 || destPage > MEDIUM_PAGED_APP.pagesData.length) {
				// Exception
				// throw 'Destination page ' + destPage + 'does not exist.';
				console.log('Error 46102');
			} else {
				// Valid operation
				document.getElementById('JNMPA-CSS-Global_1').innerHTML = [
					'div[data-page-index] { display: none; }',
					'div[data-page-index="_PAGE_"] { display: block; }'.replace('_PAGE_', destPage),
				''].join('');
				MEDIUM_PAGED_APP.runtime.currentPage = destPage;
				MEDIUM_PAGED_APP.methods.updateControls();
			};
		},
		pagePrev: function () {
			MEDIUM_PAGED_APP.methods.movePage(MEDIUM_PAGED_APP.runtime.currentPage - 1);
		},
		pageNext: function () {
			MEDIUM_PAGED_APP.methods.movePage(MEDIUM_PAGED_APP.runtime.currentPage + 1);
		},
		close: function () {
			document.getElementsByTagName('html')[0].removeAttribute('data-overflow-hidden');
			document.getElementById('JNMPA-Addon-duplicate').remove();
			document.getElementById('JNMPA-UI-container').remove();
			document.getElementById('JNMPA-CSS-Global_1').remove();
			document.getElementById('JNMPA-CSS-Global_2').remove();
			window.setTimeout(function () {
				delete MEDIUM_PAGED_APP;
			}, 200);
		}
	};
})();

MEDIUM_PAGED_APP.methods.init();
