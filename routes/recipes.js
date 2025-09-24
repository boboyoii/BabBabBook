import express from "express";
import Recipe from "../models/recipe.js";

const router = express.Router();

// 레시피 조회 (GET /api/recipes)
// 해당 카테고리 레시피 리스트 조회 (GET /api/recipes?category={category}) 
// 검색 내용이 포함되는 레시피 조회 (GET /api/recipes?q={search})
router.get('/', async (req, res) => {
  try {
    const { category , q} = req.query;
    let recipes;
    let query = {};


    if (category) {
      recipes = await Recipe.find({ category: category });
    }else if(q){
        query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
        ];
        recipes = await Recipe.find(query);
        
    }else {
      recipes = await Recipe.find();
    }

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 해당 ID인 레시피 상세 내용 조회

// 새로운 레시피 등록 (POST /api/recipes)

// 해당 ID인 레시피 수정

// 해당 ID인 레시피 삭제 

export default router;