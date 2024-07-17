package com.starter.fullstack.dao;

import com.starter.fullstack.api.Inventory;
import java.util.List;
import java.util.Objects;
import javax.annotation.Resource;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.utility.DockerImageName;

/**
 * Test Inventory DAO.
 */
@DataMongoTest
@RunWith(SpringRunner.class)
public class InventoryDAOTest {
  @ClassRule
  public static final MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:4.0.10"));

  @Resource
  private MongoTemplate mongoTemplate;
  private InventoryDAO inventoryDAO;
  private static final String NAME = "Amber";
  private static final String PRODUCT_TYPE = "hops";

  @Before
  public void setup() {
    this.inventoryDAO = new InventoryDAO(this.mongoTemplate);
  }

  @After
  public void tearDown() {
    this.mongoTemplate.dropCollection(Inventory.class);
  }

  /**
   * Test Find All method.
   */
  @Test
  public void findAll() {
    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
    this.mongoTemplate.save(inventory);
    List<Inventory> actualInventory = this.inventoryDAO.findAll();
    Assert.assertFalse(actualInventory.isEmpty());
  }

  @Test
  public void create() {
    //Creates new inventory object
    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
    //Changes ID
    inventory.setId("FLY");
    //Adds inventory to collection
    Inventory sameInventory = this.inventoryDAO.create(inventory);
    //Checks if not equal
    Assert.assertNotEquals(sameInventory.getId(), "FLY");
    List<Inventory> actualInventory = this.inventoryDAO.findAll();
    //Checks if inventory's empty
    Assert.assertFalse(actualInventory.isEmpty());
  }

  @Test
  public void delete(){
    //Creates new inventory object
    Inventory inventory = new Inventory();
    inventory.setName(NAME);
    inventory.setProductType(PRODUCT_TYPE);
    //Changes ID
    inventory.setId("FLY");
    //Adds inventory to collection
    this.mongoTemplate.save(inventory);
    //Deletes inventory using id
    this.inventoryDAO.delete(inventory.getId());
    List<Inventory> actualInventory = this.inventoryDAO.findAll();
    //Checks if inventory's empty
    Assert.assertTrue(actualInventory.isEmpty());
  }
}
