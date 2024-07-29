package com.uade.tpo.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.entity.dto.ListProductRequest;
import com.uade.tpo.demo.entity.dto.ProductRequest;
import com.uade.tpo.demo.exceptions.ProductDuplicateException;
import com.uade.tpo.demo.exceptions.UserNotFoundException;
import com.uade.tpo.demo.service.ProductService;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin("*")
@RequestMapping("products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getLasts() {
        return ResponseEntity.ok(productService.getLasts());
    }

    @PostMapping("/list")
    public ResponseEntity<Page<Product>> listProducts(
            @RequestBody ListProductRequest productRequest,
            @RequestParam(required = false) Integer page) {
        if (page == null)
            page = 0;
        return ResponseEntity.ok(productService.listProducts(productRequest, PageRequest.of(page, 20)));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Optional<Product> result = productService.getProductById(productId);
        if (result.isPresent())
            return ResponseEntity.ok(result.get());

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Object> createProduct(@RequestBody ProductRequest productRequest)
            throws ProductDuplicateException, UserNotFoundException {
        Product result = productService.create(productRequest.toProduct(), productRequest.getUserName());
        return ResponseEntity.created(URI.create("/product/" + result.getId())).body(result);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Object> updateProduct(@PathVariable Long productId,
            @RequestBody ProductRequest productRequest) throws ProductDuplicateException {
        Product product = productRequest.toProduct();
        product.setId(productId);
        Product result = productService.update(product);
        return ResponseEntity.created(URI.create("/product/" + result.getId())).body(result);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long productId) {
        if (productService.delete(productId))
            return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
}
