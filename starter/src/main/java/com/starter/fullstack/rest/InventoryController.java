package com.starter.fullstack.rest;

import com.starter.fullstack.api.Inventory;
import com.starter.fullstack.dao.InventoryDAO;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;


/**
 * Inventory Controller.
 */
@RestController
@RequestMapping("/inventory")
public class InventoryController {
  private final InventoryDAO inventoryDAO;

  /**
   * Default Constructor.
   * @param inventoryDAO inventoryDAO.
   */
  public InventoryController(InventoryDAO inventoryDAO) {
    Assert.notNull(inventoryDAO, "Inventory DAO must not be null.");
    this.inventoryDAO = inventoryDAO;
  }

  /**
   * Find Products.
   * @return List of Product.
   */
  @GetMapping
  public List<Inventory> findInventories() {
    return this.inventoryDAO.findAll();
  }


  @PostMapping
  public Inventory createInventories(@Valid @RequestBody Inventory inventory) {
    //Returns newly created item
    return this.inventoryDAO.create(inventory);
  }

  @DeleteMapping
  public List<Inventory> deleteInventories(@Valid @RequestBody String[] ids) {
    //Deletes inventory
    List<Inventory> newInventory = new java.util.ArrayList<>(List.of());

    for (String i : ids) {
      newInventory.add(this.inventoryDAO.delete(i).orElseGet(Inventory::new));
    }
    return newInventory;
  }

  @PutMapping
  public Inventory updateInventories(@Valid @RequestBody Inventory inventory) {
    //Updates inventory
    Optional<Inventory> sameInventory = this.inventoryDAO.update(inventory);
    //Unwraps and returns original or new inventory
    return sameInventory.orElseGet(Inventory::new);
  }
}

