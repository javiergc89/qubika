import { BASE_URL, CATEGORIES_PATH } from "../api/enpoints";
import { expect } from '@playwright/test';
const axios = require('axios');
import { axiosConfig } from "../api/axios-config";


export async function validateCategory(name:string): Promise<void> {
    try{
      const response = await axios.get(BASE_URL+CATEGORIES_PATH,axiosConfig);
      expect(response.data.some(item=> item.name === name)).toBeTruthy();
    }catch(error){  
      console.log('Category '+name+ 'was not created.', error);
        throw error;
    }
  };