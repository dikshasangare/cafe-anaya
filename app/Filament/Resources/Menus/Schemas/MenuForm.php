<?php

namespace App\Filament\Resources\Menus\Schemas;

use App\Services\MenuAiService;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Flex;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {

        return $schema->components([
            Grid::make(2)
                ->schema([
                    Section::make('Dish Information')
                        ->description('The core details of your menu item.')
                        ->collapsible()
                        ->schema([
                            TextInput::make('name')
                                ->required()
                                ->live(onBlur: true)
                                ->placeholder('Enter dish name...')
                                // REDESIGNED AI BUTTON: Highly visible block-style action
                                ->hintAction(
                                    Action::make('generateWithAi')
                                        ->label('✨ Auto-Fill with AI')
                                        ->color('success')
                                        ->icon('heroicon-s-sparkles')
                                        ->tooltip('Click to let AI write your description and tags')
                                        ->action(function ($state, $livewire) {
                                            if (empty($state)) {
                                                Notification::make()
                                                    ->warning()
                                                    ->title('Name required')
                                                    ->send();
                                                return;
                                            }
                                            Notification::make()
                                                ->info()
                                                ->title('AI is cooking...')
                                                ->send();
                                            try {
                                                $details = app(MenuAiService::class)
                                                    ->generateMenuDetails($state);
                                                if ($details) {
                                                    $livewire->form->fill(array_merge($livewire->form->getState(), [
                                                        'description'       => $details['description'] ?? '',
                                                        'short_description' => $details['short_description'] ?? '',
                                                        'ingredients'       => $details['ingredients'] ?? [],
                                                        'preparation_time'  => $details['preparation_time'] ?? null,
                                                        'cooking_style'     => $details['cooking_style'] ?? '',
                                                        'calories'          => $details['calories'] ?? '',
                                                        'cuisine_type'      => $details['cuisine_type'] ?? '',
                                                        'spice_level'       => $details['spice_level'] ?? '',
                                                        'ai_generated'      => true,
                                                    ]));
                                                    Notification::make()
                                                        ->success()
                                                        ->title('Generated!')
                                                        ->send();
                                                }
                                            } catch (\Exception $e) {
                                                Notification::make()
                                                    ->danger()
                                                    ->title('AI Failed')
                                                    ->body($e->getMessage())
                                                    ->send();
                                            }
                                        })
                                )
                                ->afterStateUpdated(fn($state, $set) => $set('slug', Str::slug($state))),

                            TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true),

                            Select::make('category_id')
                                ->relationship('category', 'name')
                                ->searchable()
                                ->preload(),
                            // ->required(),
                            Textarea::make('short_description')
                                ->rows(2)
                                ->placeholder('Catchy one-liner...'),

                            Textarea::make('description')
                                ->rows(5)
                                ->placeholder('Full recipe description...'),


                        ]),

                    Section::make('Culinary Attributes')
                        ->description('Technical dish specifications.')
                        ->collapsible()
                        ->schema([
                            TagsInput::make('ingredients')
                                ->placeholder('Add ingredients...')
                                ->reorderable(),
                            TextInput::make('preparation_time')
                                ->numeric()
                                ->suffix('mins')
                                ->prefixIcon('heroicon-o-clock'),
                            TextInput::make('calories')
                                ->placeholder('kcal')
                                ->prefixIcon('heroicon-o-fire'),
                            TextInput::make('rating')
                                ->numeric()
                                ->default(0)
                                ->maxValue(5)
                                ->prefixIcon('heroicon-o-star'),
                            TextInput::make('spice_level')
                                ->placeholder('e.g. Hot'),

                            Grid::make(2)
                                ->schema([
                                    TextInput::make('cuisine_type')
                                        ->placeholder('e.g. Asian'),
                                    TextInput::make('cooking_style')
                                        ->placeholder('e.g. Grilled'),
                                ]),
                        ]),


                ])
                ->columnSpan(2),

            // --- RIGHT SIDE: Pricing, Image & Status (Spans 1 column) ---
            Grid::make(2)
                ->schema([
                    Section::make('Media & Pricing')
                        ->schema([

                            TextInput::make('price')
                                // ->required()
                                ->numeric()
                                ->prefix('$'),
                            TextInput::make('discount_price')
                                ->numeric()
                                ->prefix('$'),

                            FileUpload::make('image')
                                ->image()
                                ->disk('public')
                                ->imageEditor(),
                        ]),



                    Section::make('Status')
                        ->schema([
                            Grid::make(2)
                                ->schema([
                                    Toggle::make('is_available')
                                        ->label('Available for Order')
                                        ->inline(false),
                                    Toggle::make('is_featured')
                                        ->label('Featured Dish')
                                        ->inline(false),
                                    Toggle::make('signature')
                                        ->label('Chef Special')
                                        ->inline(false),
                                    Toggle::make('ai_generated')
                                        ->label('AI Generated Content')
                                        ->disabled()
                                        ->inline(false)
                                        ->dehydrated(),
                                ]),
                        ]),
                ])
                ->columnSpan(2),
        ]);
    }
}
