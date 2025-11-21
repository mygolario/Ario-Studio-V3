# Ario Studio V3.1 - Customization Guide

## 🎨 Gradient Colors

To adjust the sunset gradient colors, edit `tailwind.config.ts`:

```typescript
'sunset-orange': '#FF6A3D',  // Change these hex values
'sunset-gold': '#FFB347',
'sunset-yellow': '#FFD75F',
'sunset-red': '#FF4D4D',
```

The gradient utilities are defined in `backgroundImage`:
- `gradient-sunset` - Main linear gradient
- `gradient-sunset-soft` - Soft overlay version
- `gradient-sunset-radial` - Radial version

## 🎬 Animation Duration & Intensity

### AnimatedGradientBackground

Edit `components/AnimatedGradientBackground.tsx`:

- **Duration**: Change `duration: 25` in the `animate` props (lines ~50-60)
- **Intensity**: Modify `sizeMap` and `opacityMap` objects (lines ~20-35)
- **Blob colors**: Update the `background` gradient values in each blob div

### FeatureIcon3D

Edit `components/FeatureIcon3D.tsx`:

- **Animation speed**: Change `duration: 2 + i * 0.3` in animate props
- **Hover effects**: Modify `whileHover` props (scale, rotateZ values)
- **Add new variants**: Add a new case in the `switch` statement

## 🍔 Mega Menu Items

Edit `components/Header.tsx`:

1. **Add new nav items**: Add to the `navItems` array (line ~40)
2. **Add mega menu**: Include `megaMenu` object with `title` and `items` array
3. **Mega menu items**: Each item needs:
   - `title`: Display name
   - `description`: Short description
   - `href`: Link destination
   - `icon`: Optional - 'brain' | 'cube' | 'graph' | 'chart'

Example:
```typescript
{
  label: 'Services',
  href: '#services',
  megaMenu: {
    title: 'Our Services',
    items: [
      {
        title: 'New Service',
        description: 'Service description',
        href: '#services',
        icon: 'brain',
      },
    ],
  },
}
```

## 🎯 3D Icons

To add new icon variants to `FeatureIcon3D`:

1. Add new case in the `switch` statement
2. Create JSX structure using gradients and motion
3. Use `bg-gradient-sunset` or custom gradients
4. Add animation with `animate` prop

Example structure:
```typescript
case 'new-variant':
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="..."
        animate={{ ... }}
      />
    </div>
  )
```

## 📐 Scroll Animations

Animation patterns are centralized in `lib/animations.ts`:

- `fadeInUp`: Fade + slide up
- `fadeInScale`: Fade + scale
- `staggerContainer`: Stagger children animations
- `hoverScale`: Button hover effect
- `hoverLift`: Card hover effect

To adjust timing, modify the `duration` values in each variant.

## 🎨 Global Styling

- **Font**: Space Grotesk is set globally in `app/layout.tsx`
- **Colors**: All sunset colors in `tailwind.config.ts`
- **Spacing**: Custom spacing scale in Tailwind config
- **Shadows**: Custom shadow utilities (shadow-warm, shadow-soft)

## 🚀 Performance Tips

- AnimatedGradientBackground uses `pointer-events-none` for performance
- 3D transforms use GPU acceleration (transform3d)
- Scroll animations use `whileInView` with `once: true` to prevent re-triggering
- Mega menu uses `AnimatePresence` for smooth enter/exit

