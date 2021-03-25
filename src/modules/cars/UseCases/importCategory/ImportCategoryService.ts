import fs from 'fs';
import csvParse from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryService {
  constructor(
    private categoriesRepository: ICategoriesRepository
  ) {}

  
  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    const stream = fs.createReadStream(file.path);
    const categories: IImportCategory[] = [];

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on('data', async (line) => {
      const [name, description] = line;
      categories.push({
        name,
        description
      });
    });

    await new Promise(resolve =>  parseFile.on('end', resolve));

    await fs.promises.unlink(file.path);
    return categories;
  }

  public async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(category => {
      const { name, description } = category;

      const categoryExists = this.categoriesRepository.findByName(name);
      if(!categoryExists) {
        this.categoriesRepository.create({
          name,
          description
        })
      }

      return;
    });
  }
}