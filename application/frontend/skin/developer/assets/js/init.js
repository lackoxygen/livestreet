/**
 * Инициализации модулей
 *
 * @license   GNU General Public License, version 2
 * @copyright 2013 OOO "ЛС-СОФТ" {@link http://livestreetcms.com}
 * @author    Denis Shakhov <denis.shakhov@gmail.com>
 */

jQuery(document).ready(function($){
	// Хук начала инициализации javascript-составляющих шаблона
	ls.hook.run('ls_template_init_start',[],window);

	/**
	 * Иниц-ия модулей ядра
	 */
	ls.init({
		production: false
	});

	ls.dev.init();


	/**
	 * Actionbar
	 */
	$('.js-user-list-modal-actionbar').livequery(function () {
		$( this ).lsActionbarItemSelect({
			selectors: {
				target_item: '.js-user-list-select .js-user-list-small-item'
			}
		});
	});


	/**
	 * Modals
	 */
	$('.js-modal-default').lsModal();


	/**
	 * Accordion
	 */
	$('.js-accordion-default').accordion({
		collapsible: true
	});


	/**
	 * Dropdowns
	 */
	$('.js-dropdown-default').livequery(function () {
		$(this).lsDropdown();
	});


	/**
	 * Tabs
	 */
	$( '.js-tabs-auth, .js-tabs-block' ).lsTabs();


	/**
	 * Fields
	 */
	ls.geo.initSelect();

	$('.js-date-picker').datepicker();

	$('[data-type=captcha]').livequery(function () {
		$(this).captcha();
	});


	/**
	 * Alerts
	 */
	$('.js-alert').lsAlert();


	/**
	 * Tooltips
	 */
	$('.js-tooltip').tooltip();

	$('.js-popover-default').tooltip({
		useAttrTitle: false,
		trigger: 'click',
		classes: 'tooltip-light'
	});

	if (ls.registry.get('block_stream_show_tip')) {
		$('.js-title-comment, .js-title-topic').livequery(function () {
			$(this).tooltip({
				position: {
					my: "right center",
					at: "left left"
				},
				show: {
					delay: 1500
				}
			});
		});
	}


	/**
	 * Autocomplete
	 */
	$( '.autocomplete-tags' ).lsAutocomplete({
		multiple: false,
		urls: {
			load: aRouter.ajax + 'autocompleter/tag/'
		}
	});

	$( '.autocomplete-tags-sep' ).lsAutocomplete({
		multiple: true,
		urls: {
			load: aRouter.ajax + 'autocompleter/tag/'
		}
	});

	$( '.autocomplete-users' ).lsAutocomplete({
		multiple: false,
		urls: {
			load: aRouter.ajax + 'autocompleter/user/'
		}
	});

	$( '.autocomplete-users-sep' ).lsAutocomplete({
		multiple: true,
		urls: {
			load: aRouter.ajax + 'autocompleter/user/'
		}
	});


	/**
	 * Code highlight
	 */
	prettyPrint();


	/**
	 * Blocks
	 */
	$( '.js-block-default' ).lsBlock();


	/**
	 * Активность
	 */
	$('.js-activity--all').lsActivity({ urls: { more: aRouter.stream + 'get_more_all' } });
	$('.js-activity--user').lsActivity({ urls: { more: aRouter.stream + 'get_more_user' } });
	$('.js-activity--personal').lsActivity({
		urls: {
			more: aRouter.stream + 'get_more_personal'
		},
		create: function() {
			// Настройки активности
			$('.js-activity-settings').lsActivitySettings({
				urls: {
					toggle_type: aRouter.stream + 'switchEventType'
				}
			});

			// Добавление пользователей в персональную активность
			$('.js-activity-users').user_list_add({
				urls: {
					add: aRouter.stream + 'ajaxadduser',
					remove: aRouter.stream + 'ajaxremoveuser'
				}
			});
		}
	});


	/**
	 * Лента
	 */
	$('.js-feed').lsFeed({
		urls: {
			more: aRouter.feed + 'get_more'
		},
		create: function() {
			// Блоги
			$('.js-feed-blogs').lsFeedBlogs({
				urls: {
					subscribe: aRouter.feed + 'subscribe',
					unsubscribe: aRouter.feed + 'unsubscribe'
				}
			});

			// Добавление пользователей в свою ленту
			$('.js-feed-users').user_list_add({
				urls: {
					add: aRouter.feed + 'ajaxadduser',
					remove: aRouter.feed + 'unsubscribe'
				}
			});
		}
	});


	/**
	 * Toolbar
	 */
	$('.js-toolbar').toolbar({
		target: '.grid-role-wrapper',
		offsetX: 20
	});
	$('.js-toolbar-scrollup').lsToolbarScrollUp();
	$('.js-toolbar-comments').lsToolbarComments();
	$('.js-toolbar-topics').lsToolbarTopics();


	/**
	 * User
	 */
	ls.user.init();

	// Голосование за пользователя
	$('.js-vote-user').vote({
		urls: {
			vote: aRouter['ajax'] + 'vote/user/'
		}
	});


	/**
	 * Talk
	 */
	ls.talk.init();

	// Форма поиска
	$('.js-talk-search-form').accordion({
		collapsible: true,
		active: false
	});

	// Добавление диалога в избранное
	$('.js-favourite-talk').lsFavourite({
		urls: {
			toggle: aRouter['ajax'] + 'favourite/talk/'
		}
	});

	// Комментарии
	$('.js-comments-talk').lsComments({
		urls: {
			add:  aRouter['talk'] + 'ajaxaddcomment/',
			load: aRouter['talk'] + 'ajaxresponsecomment/'
		}
	});

	// Экшнбар
	$('.js-talk-actionbar-select').lsActionbarItemSelect({
		selectors: {
			target_item: '.js-message-list-item'
		}
	});

	// Добавление участников личного сообщения
	$('.js-message-users').message_users();

	// Черный список
	$('.js-user-list-add-blacklist').user_list_add({
		urls: {
			add: aRouter['talk'] + 'ajaxaddtoblacklist/',
			remove: aRouter['talk'] + 'ajaxdeletefromblacklist/'
		}
	});


	/**
	 * Poll
	 */
	$('.js-poll').lsPoll();
	$('.js-poll-manage').lsPollManage();


	/**
	 * User Note
	 */
	$('.js-user-note').livequery(function () {
		$(this).lsNote({
			urls: {
				save:   aRouter['profile'] + 'ajax-note-save/',
				remove: aRouter['profile'] + 'ajax-note-remove/'
			}
		});
	});


	/**
	 * Editor
	 */
	$( '.js-editor-default' ).lsEditor();


	/**
	 * Blog
	 */
	ls.blog.init();

	// Голосование за блог
	$('.js-vote-blog').vote({
		urls: {
			vote: aRouter['ajax'] + 'vote/blog/'
		}
	});

	// Приглашение пользователей в блог
	$('.js-user-list-add-blog-invite').lsBlogInvites();


	/**
	 * Topic
	 */
	$( '.js-topic' ).lsTopic();
	ls.topic.init();
	ls.content.init();

	// Пагинация
	$('.js-pagination-topics').lsPagination({
		hash: {
			next: 'goTopic=first',
			prev: 'goTopic=last'
		}
	});

	$('.js-comments-topic').lsComments({
		urls: {
			add:  aRouter['blog'] + 'ajaxaddcomment/',
			load: aRouter['blog'] + 'ajaxresponsecomment/'
		}
	});


	/**
	 * Теги
	 */
	ls.tags.init();

	// Облако тегов избранного
	$('.js-tags-favourite-accordion').accordion({
		collapsible: true,
		active: false
	});


	/**
	 * Form validate
	 */
	$('.js-form-validate').parsley({
		validators: {
			rangetags: function (val, arrayRange) {
				var tag_count = val.replace(/ /g, "").match(/[^\s,]+(,|)/gi);
				return tag_count && tag_count.length >= arrayRange[0] && tag_count.length <= arrayRange[1];
			}
		},
		// TODO: Вынести в лок-ию
		messages: {
			rangetags: "Кол-во тегов должно быть от %s до %s"
		}
	});


	/**
	 * Стена
	 */
	$('.js-wall-default').lsWall({
		urls: {
			add:           aRouter.ajax + 'wall/add/',
			remove:        aRouter.ajax + 'wall/remove/',
			load:          aRouter.ajax + 'wall/load/',
			load_comments: aRouter.ajax + 'wall/load-comments/'
		}
	});


	/**
	 * Лайтбокс
	 */
	$('a.js-lbx').colorbox({ width:"100%", height:"100%" });


	/**
	 * Поиск
	 */
	ls.search.init();


	/**
	 * Fotorama
	 */
	$( '.fotorama' ).livequery(function() {
		$( this ).fotorama();
	});

	// Хук конца инициализации javascript-составляющих шаблона
	ls.hook.run('ls_template_init_end',[],window);
});