<?php

namespace kmergen\media\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Media;

/**
 * MediaSearch represents the model behind the search form about `app\models\Media`.
 */
class MediaSearch extends Media
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'album_id', 'album_position', 'user_id', 'size', 'status'], 'integer'],
            [['name', 'url', 'type', 'created'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Media::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'album_id' => $this->album_id,
            'album_position' => $this->album_position,
            'user_id' => $this->user_id,
            'size' => $this->size,
            'created' => $this->created,
            'status' => $this->status,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'url', $this->url])
            ->andFilterWhere(['like', 'type', $this->type]);

        return $dataProvider;
    }
}
