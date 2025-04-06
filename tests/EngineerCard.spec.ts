import { test, expect } from '@playwright/test';

test.describe('EngineerCard Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Storybook page for the EngineerCard component
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--default');
  });

  test('displays engineer information correctly', async ({ page }) => {
    const card = page.locator('[data-testid="engineer-card"]');
    await expect(card).toBeVisible();
    await expect(page.locator('text=Jane Smith')).toBeVisible();
    await expect(page.locator('text=Frontend Development')).toBeVisible();
  });

  test('shows loading state', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--loading');
    const loadingCard = page.locator('[data-testid="engineer-card-loading"]');
    await expect(loadingCard).toBeVisible();
  });

  test('displays hover effects', async ({ page }) => {
    const card = page.locator('[data-testid="engineer-card"]');
    
    // Initial state
    const skillsContainer = page.locator('[data-testid="skills-container"]');
    await expect(skillsContainer).toHaveClass(/opacity-0/);
    
    // Hover state
    await card.hover();
    await expect(skillsContainer).toHaveClass(/opacity-100/);
    await expect(card).toHaveClass(/scale-105/);
    
    // Quick action buttons should be visible on hover
    const actionButtons = page.locator('[data-testid="action-buttons"]');
    await expect(actionButtons).toBeVisible();
    await expect(actionButtons).toHaveClass(/opacity-100/);
  });

  test('displays years of experience badge', async ({ page }) => {
    const badge = page.locator('[data-testid="experience-badge"]');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('5 YOE');
  });

  test('shows correct availability status', async ({ page }) => {
    // Test available status
    const availabilityStatus = page.locator('[data-testid="availability-status"]');
    await expect(availabilityStatus).toHaveClass(/bg-green-500/);
    
    // Test unavailable status
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--unavailable');
    await expect(availabilityStatus).toHaveClass(/bg-red-500/);
  });

  test('displays rating correctly', async ({ page }) => {
    const rating = page.locator('[data-testid="rating"]');
    await expect(rating).toBeVisible();
    await expect(rating).toHaveText('4.5');
    
    // Test high rating
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--high-rating');
    await expect(rating).toHaveText('5.0');
  });

  test('plays video preview on hover when available', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--with-video');
    const card = page.locator('[data-testid="engineer-card"]');
    const video = page.locator('video');
    
    // Video should be paused initially
    await expect(video).toHaveAttribute('paused', '');
    
    // Video should play on hover
    await card.hover();
    await expect(video).not.toHaveAttribute('paused', '');
  });

  // Visual regression tests
  test('matches screenshot', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--default');
    await expect(page).toHaveScreenshot('engineer-card-default.png');
    
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--loading');
    await expect(page).toHaveScreenshot('engineer-card-loading.png');
    
    await page.goto('http://localhost:6006/?path=/story/components-engineercard--with-video');
    await expect(page).toHaveScreenshot('engineer-card-with-video.png');
  });
}); 