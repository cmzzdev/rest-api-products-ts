import { Op } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  addAttribute,
} from "sequelize-typescript";

@Table({
  tableName: "products",
})
class Product extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare availability: boolean;
}

export default Product;
