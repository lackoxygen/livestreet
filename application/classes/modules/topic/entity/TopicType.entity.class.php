<?php
/**
 * LiveStreet CMS
 * Copyright © 2013 OOO "ЛС-СОФТ"
 *
 * ------------------------------------------------------
 *
 * Official site: www.livestreetcms.com
 * Contact e-mail: office@livestreetcms.com
 *
 * GNU General Public License, version 2:
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * ------------------------------------------------------
 *
 * @link http://www.livestreetcms.com
 * @copyright 2013 OOO "ЛС-СОФТ"
 * @author Maxim Mzhelskiy <rus.engine@gmail.com>
 *
 */

/**
 * Объект типа топика
 * TODO: при удалении типа топика необходимо удалять дополнительные поля
 *
 * @package modules.topic
 * @since 1.0
 */
class ModuleTopic_EntityTopicType extends Entity {

	protected $aValidateRules=array(
		array('name, name_many','string','max'=>200,'min'=>1,'allowEmpty'=>false),
		array('code','regexp','pattern'=>"#^[a-z0-9_]{1,30}$#",'allowEmpty'=>false),
		array('code','code_unique'),
	);

	public function ValidateCodeUnique() {
		if ($oType=$this->Topic_GetTopicTypeByCode($this->getCode())) {
			if ($oType->getId()!=$this->getId()) {
				return 'Тип с таким кодом уже существует';
			}
		}
		return true;
	}
	/**
	 * Возвращает список дополнительных параметров типа
	 *
	 * @return array|mixed
	 */
	public function getParamsArray() {
		$aData=@unserialize($this->_getDataOne('params'));
		if (!$aData) {
			$aData=array();
		}
		return $aData;
	}
	/**
	 * Устанавливает список дополнительных параметров типа
	 *
	 * @param array $aParams
	 */
	public function setParams($aParams) {
		$this->_aData['params']=@serialize($aParams);
	}
	/**
	 * Возвращает конкретный параметр типа
	 *
	 * @param string $sName
	 *
	 * @return null
	 */
	public function getParam($sName) {
		$aParams=$this->getParams();
		return isset($aParams[$sName]) ? $aParams[$sName] : null;
	}

	public function getStateText() {
		if ($this->getState()==ModuleTopic::TOPIC_TYPE_STATE_ACTIVE) {
			return 'активен';
		}
		if ($this->getState()==ModuleTopic::TOPIC_TYPE_STATE_NOT_ACTIVE) {
			return 'не активен';
		}
		return 'неизвестный статус';
	}

	public function getUrlForAdd() {
		return Router::GetPath('content/add').$this->getCode().'/';
	}
}